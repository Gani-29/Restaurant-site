import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, doc, query, updateDoc, deleteDoc } from 'firebase/firestore';

// Import Components and Pages
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './Pages/Home.jsx'; 
import Cart from './Pages/Cart.jsx'; 

const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

const tailwindConfig = {
    fontFamily: { sans: ['Inter', 'sans-serif'], },
    colors: { 'primary-dark': '#1C1C1C', 'accent-gold': '#B8860B', 'light-creme': '#EAE7DC', 'highlight-red': '#A52A2A', 'cta-bright': '#F44336', },
};

const App = () => {
    // --- State Management ---
    const [page, setPage] = useState('home'); 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [cartItems, setCartItems] = useState([]); 
    const [db, setDb] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        if (Object.keys(firebaseConfig).length === 0) {
            setUserId('Anon-Local');
            setIsAuthReady(true);
            return;
        }
        
        const initializeFirebase = async () => {
            try {
                const app = initializeApp(firebaseConfig);
                const firestore = getFirestore(app);
                setDb(firestore); 
                const authInstance = getAuth(app); 

                try {
                    if (initialAuthToken) {
                        await signInWithCustomToken(authInstance, initialAuthToken);
                        console.log("Firebase: Signed in with Custom Token.");
                    } else {
                        await signInAnonymously(authInstance);
                        console.log("Firebase: Signed in Anonymously (No token provided).");
                    }
                } catch (authError) {
                   
                    console.error("Firebase Auth Failed (Token Issue/Expired). Falling back to Anonymous sign-in.", authError);
                    await signInAnonymously(authInstance); 
                }

               
                const unsubscribe = onAuthStateChanged(authInstance, (user) => {
                    if (user) {
                        setUserId(user.uid);
                    } else {
                        setUserId('Auth-Failed'); 
                    }
                    setIsAuthReady(true);
                });

                return unsubscribe;
            } catch (error) { 
                console.error("Fatal Firebase Initialization Failed:", error);
                setUserId('Init-Failed'); 
                setIsAuthReady(true); 
                return () => {}; 
            }
        };

        const cleanup = initializeFirebase();
        return () => { cleanup.then(f => f && f()); }; 
    }, []);

    // --- Real-time Cart Listener ---
    useEffect(() => {
        let unsubscribeCart = () => {};
     
        if (isAuthReady && db && userId && userId !== 'Auth-Failed' && userId !== 'Init-Failed') {
            try {
                const cartRef = collection(db, `artifacts/${appId}/users/${userId}/cartItems`);
                const q = query(cartRef);
                unsubscribeCart = onSnapshot(q, (snapshot) => {
                    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), }));
                    setCartItems(items);
                }, (error) => {
                    console.error("Cart Listener Error:", error);
                    setCartItems([]);
                });
            } catch (error) { /* Error listening to cart */ }
        } else if (userId === 'Auth-Failed' || userId === 'Init-Failed') {
            setCartItems([]);
        }
        return () => unsubscribeCart();
    }, [isAuthReady, db, userId]);

    // --- Cart CRUD Handlers ---
    const handleAddToCart = async (dish) => {
       
        if (!isAuthReady || !db || !userId || userId === 'Auth-Failed') { setSuccessMessage({ error: true, message: `Cannot add to cart. Authentication required or failed. Current User ID Status: ${userId}` }); return; }
        setIsLoading(true);
        const existingCartItem = cartItems.find(item => item.dishId === dish.id);
        try {
            if (existingCartItem) {
                const itemDocRef = doc(db, `artifacts/${appId}/users/${userId}/cartItems`, existingCartItem.id);
                await updateDoc(itemDocRef, { quantity: existingCartItem.quantity + 1, updatedAt: serverTimestamp() });
            } else {
                const cartRef = collection(db, `artifacts/${appId}/users/${userId}/cartItems`);
                await addDoc(cartRef, { dishId: dish.id, name: dish.name, price: dish.currentPrice, quantity: 1, oldPrice: dish.oldPrice, discount: dish.discount, addedAt: serverTimestamp() });
            }
            setSuccessMessage({ error: false, message: `${dish.name} added to cart!` });
        } catch (error) { 
            console.error("Failed to add to cart:", error);
            setSuccessMessage({ error: true, message: `Failed to modify cart: ${error.message}. Check console for details.` }); 
        } finally { setIsLoading(false); }
    };
    const handleUpdateQuantity = async (itemId, newQuantity) => {
        if (!isAuthReady || !db || !userId || userId === 'Auth-Failed') return;
        if (newQuantity <= 0) { await handleRemoveFromCart(itemId); return; }
        try {
            const itemDocRef = doc(db, `artifacts/${appId}/users/${userId}/cartItems`, itemId);
            await updateDoc(itemDocRef, { quantity: newQuantity, updatedAt: serverTimestamp() });
        } catch (error) { setSuccessMessage({ error: true, message: `Failed to update quantity: ${error.message}` }); }
    };
    const handleRemoveFromCart = async (itemId) => {
        if (!isAuthReady || !db || !userId || userId === 'Auth-Failed') return;
        try {
            const itemDocRef = doc(db, `artifacts/${appId}/users/${userId}/cartItems`, itemId);
            await deleteDoc(itemDocRef);
        } catch (error) { setSuccessMessage({ error: true, message: `Failed to remove item: ${error.message}` }); }
    };
    
    // --- Reservation Handler ---
    const handleReservationSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthReady || !db || !userId || userId === 'Auth-Failed' || userId === 'Init-Failed') { setSuccessMessage({ error: true, message: `Authentication or system setup failed. Current User ID Status: ${userId}` }); return; }
        setIsLoading(true);
        const formData = new FormData(e.target);
        const reservationData = { name: formData.get('name'), mobile: formData.get('mobile'), date: formData.get('date'), time: formData.get('time'), guests: parseInt(formData.get('guests')), reservedBy: userId, timestamp: serverTimestamp() };
        try {
            const reservationsRef = collection(db, `artifacts/${appId}/public/data/reservations`);
            await addDoc(reservationsRef, reservationData);
            setSuccessMessage({ error: false, message: `Thank you, ${reservationData.name}! Your reservation for ${reservationData.guests} guests has been successfully placed in the database.` });
            e.target.reset();
        } catch (error) { setSuccessMessage({ error: true, message: `Could not save your reservation. Details: ${error.message}` }); } finally { setIsLoading(false); }
    };

    // --- Other Handlers ---
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeSuccessModal = () => setSuccessMessage(null);

    // --- Main Component Render ---
    return (
        <div className="bg-primary-dark text-light-creme min-h-screen">
            <style>{`
                body { font-family: ${tailwindConfig.fontFamily.sans.join(', ')}; scroll-behavior: smooth; }
                .form-input { border-radius: 8px; padding: 12px; border: 1px solid #d1d5db; background-color: white; color: ${tailwindConfig.colors['primary-dark']}; }
                .horizontal-scroll-container, .menu-scroll-row { overflow-x: auto; white-space: nowrap; padding-bottom: 1rem; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
                .horizontal-scroll-container::-webkit-scrollbar, .menu-scroll-row::-webkit-scrollbar { display: none; }
                .scroll-item { display: inline-block; margin-right: 1rem; }
            `}</style>

            <Header 
                setPage={setPage}
                cartItemsCount={cartItems.length}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
            />

    
            {page === 'home' ? (
                <Home 
                    handleAddToCart={handleAddToCart} 
                    handleReservationSubmit={handleReservationSubmit} 
                    isLoading={isLoading}
                    isAuthReady={isAuthReady}
                />
            ) : (
                <Cart 
                    cartItems={cartItems}
                    handleUpdateQuantity={handleUpdateQuantity}
                    handleRemoveItem={handleRemoveFromCart}
                />
            )}

            <Footer 
                isAuthReady={isAuthReady} 
                userId={userId} 
            />

            {successMessage && (
                <div className="fixed inset-0 bg-primary-dark bg-opacity-90 z-[110] flex items-center justify-center p-4" aria-modal="true" role="alert">
                  
                    <div className={`bg-primary-dark border ${successMessage.error ? 'border-highlight-red' : 'border-accent-gold'} rounded-xl shadow-2xl max-w-sm w-full p-8 text-center transition-all duration-300 transform scale-100 opacity-100 text-light-creme`}>
                        
                      
                        <svg className={`w-16 h-16 mx-auto ${successMessage.error ? 'text-highlight-red' : 'text-accent-gold'} mb-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={successMessage.error ? "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"}></path></svg>
                        
                        
                        <h3 className={`text-2xl font-serif font-bold mb-3 ${successMessage.error ? 'text-highlight-red' : 'text-accent-gold'}`}>{successMessage.error ? 'Action Failed' : 'Success!'}</h3>
                        
                        
                        <p className={`mb-6 ${successMessage.error ? 'text-highlight-red' : 'text-light-creme'}`}>{successMessage.message}</p>
                        
                        {/* Button */}
                        <button onClick={closeSuccessModal} className="bg-accent-gold text-primary-dark px-6 py-2 rounded-full font-semibold hover:bg-highlight-red hover:text-light-creme transition duration-300">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;