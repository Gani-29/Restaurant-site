import React, { useState, useEffect } from 'react';
import { supabase, getLocalUserId, fetchCartItems } from './supabase_config'; 

// Import Components and Pages
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './Pages/Home.jsx'; 
import Cart from './Pages/Cart.jsx'; 
import { Login } from './Pages/Login.jsx'; 

const tailwindConfig = {
    fontFamily: { sans: ['Inter', 'sans-serif'], },
    colors: { 'primary-dark': '#1C1C1C', 'accent-gold': '#B8860B', 'light-creme': '#EAE7DC', 'highlight-red': '#A52A2A', 'cta-bright': '#F44336', 'card-dark': '#2E2E2E' },
};
// ---------------------------------------------------


const App = () => {
    // --- State Management ---
    const [page, setPage] = useState('home'); 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [cartItems, setCartItems] = useState([]); 
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [session, setSession] = useState(null); 

    // --- Supabase Initialization and Auth/User Setup ---
    useEffect(() => {
        if (!supabase) {
            setUserId('Init-Failed'); 
            setIsAuthReady(true);
            return;
        }

        // --- Supabase Auth Listener ---
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session); // Update the session state
            
            if (session?.user) {
                // User logged in (Authenticated)
                setUserId(session.user.id);
                // After successful login, redirect to home page
                if (page !== 'home') setPage('home'); 
                
            } else {
                setUserId(null); 
                setCartItems([]);
            }
            setIsAuthReady(true);
        });
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session?.user) {
                setUserId(session.user.id);
            }
            setIsAuthReady(true);
        });

        return () => {
            if (subscription && subscription.unsubscribe) {
                subscription.unsubscribe();
            }
        };
    }, []);

    // --- Real-time Cart Listener 
    useEffect(() => {
        let subscription = { unsubscribe: () => {} };

        if (isAuthReady && supabase && userId && userId !== 'Init-Failed' && session?.user) {
            try {
               
                const channel = supabase.channel(`cart_changes_${userId}`);

                channel
                    .on(
                        'postgres_changes',
                        { event: '*', schema: 'public', table: 'cart_items', filter: `user_id=eq.${userId}` },
                        () => {
                            fetchCartItems(userId, setCartItems); 
                        }
                    )
                    .subscribe((status) => {
                        if (status === 'SUBSCRIBED') {
                            fetchCartItems(userId, setCartItems); 
                        }
                    });

                // Set cleanup function
                subscription.unsubscribe = () => supabase.removeChannel(channel);

            } catch (error) {
                console.error("Error setting up Supabase cart listener:", error);
                setCartItems([]);
            }
        } else {
             setCartItems([]);
        }

        return () => subscription.unsubscribe();
    }, [isAuthReady, userId, session]); 

    const handleAddToCart = async (dish) => {
        if (!isAuthReady || !supabase || !userId || !session?.user) { 
            setSuccessMessage({ error: true, message: "Please log in to add items to your cart." }); 
            return; 
        }
        setIsLoading(true);
        
        const existingCartItem = cartItems.find(item => item.dishId === dish.id);
        const now = new Date().toISOString(); 

        try {
            if (existingCartItem) {
                const { error } = await supabase
                    .from('cart_items')
                    .update({ quantity: existingCartItem.quantity + 1, updated_at: now })
                    .eq('id', existingCartItem.id);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('cart_items')
                    .insert({
                        user_id: userId, 
                        dish_id: dish.id, 
                        name: dish.name,
                        price: dish.currentPrice,
                        quantity: 1,
                        old_price: dish.oldPrice,
                        discount: dish.discount,
                        added_at: now 
                    });

                if (error) throw error;
            }
            setSuccessMessage({ error: false, message: `${dish.name} added to cart!` });
        } catch (error) { 
            console.error("Failed to add to cart:", error);
            setSuccessMessage({ error: true, message: `Failed to modify cart: ${error.message}. Check console for details.` }); 
        } finally { setIsLoading(false); }
    };

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        if (!isAuthReady || !supabase || !userId || !session?.user) return;
        const now = new Date().toISOString();

        if (newQuantity <= 0) {
            await handleRemoveFromCart(itemId);
            return;
        }

        try {
            const { error } = await supabase
                .from('cart_items')
                .update({ quantity: newQuantity, updated_at: now })
                .eq('id', itemId); 

            if (error) throw error;
        } catch (error) {
            console.error("Failed to update quantity:", error);
            setSuccessMessage({ error: true, message: `Failed to update quantity: ${error.message}` });
        }
    };

    const handleRemoveFromCart = async (itemId) => {
        if (!isAuthReady || !supabase || !userId || !session?.user) return;

        try {
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('id', itemId); 

            if (error) throw error;
        } catch (error) {
            console.error("Failed to remove item:", error);
            setSuccessMessage({ error: true, message: `Failed to remove item: ${error.message}` });
        }
    };
    
    // --- Reservation Handler 
    const handleReservationSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthReady || !supabase || !userId || !session?.user) { 
            setSuccessMessage({ error: true, message: "Please log in to make a reservation." }); 
            return; 
        }
        setIsLoading(true);
        const formData = new FormData(e.target);
        const now = new Date().toISOString();

        const reservationData = { 
            reservedBy: userId, 
            name: formData.get('name'), 
            mobile: formData.get('mobile'), 
            date: formData.get('date'), 
            time: formData.get('time'), 
            guests: parseInt(formData.get('guests')), 
            timestamp: now 
        };

        try {
            const { error } = await supabase
                .from('reservations') 
                .insert(reservationData);

            if (error) throw error;

            setSuccessMessage({ error: false, message: `Thank you, ${reservationData.name}! Your reservation has been successfully placed.` });
            e.target.reset();
        } catch (error) { 
            console.error("Failed to submit reservation:", error);
            setSuccessMessage({ error: true, message: `Could not save your reservation. Details: ${error.message}` }); 
        } finally { setIsLoading(false); }
    };

    // --- Other Handlers ---
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeSuccessModal = () => setSuccessMessage(null);
    
    // Check if the user is authenticated (has a Supabase session)
    const isAuthenticated = !!session?.user;

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

            {/* CONDITIONAL RENDERING: Login or Main App */}
            {!isAuthReady ? (
                // Display a loading screen while Supabase is checking the session
                <div className="min-h-screen flex items-center justify-center text-4xl font-bold text-accent-gold">
                    <svg className="animate-spin h-8 w-8 mr-3 text-accent-gold" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Loading...
                </div>
            ) : isAuthenticated ? (
                <>
                    {/* Main Application Layout */}
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
                        page={page}
                    />
                </>
            ) : (
                // Render Login page if not authenticated
                <Login />
            )}

            {/* Success Message Modal */}
            {successMessage && (
                <div className="fixed inset-0 bg-primary-dark bg-opacity-90 z-[110] flex items-center justify-center p-4" aria-modal="true" role="alert">
                    <div className={`bg-primary-dark border ${successMessage.error ? 'border-highlight-red' : 'border-accent-gold'} rounded-xl shadow-2xl max-w-sm w-full p-8 text-center transition-all duration-300 transform scale-100 opacity-100 text-light-creme`}>
                        <svg className={`w-16 h-16 mx-auto ${successMessage.error ? 'text-highlight-red' : 'text-accent-gold'} mb-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={successMessage.error ? "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"}></path></svg>
                        <h3 className={`text-2xl font-serif font-bold mb-3 ${successMessage.error ? 'text-highlight-red' : 'text-accent-gold'}`}>{successMessage.error ? 'Action Failed' : 'Success!'}</h3>
                        <p className={`mb-6 ${successMessage.error ? 'text-highlight-red' : 'text-light-creme'}`}>{successMessage.message}</p>
                        <button onClick={closeSuccessModal} className="bg-accent-gold text-primary-dark px-6 py-2 rounded-full font-semibold hover:bg-highlight-red hover:text-light-creme transition duration-300">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;