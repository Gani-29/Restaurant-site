import React from 'react';

// Cart item component
const CartItem = ({ item, handleUpdateQuantity, handleRemoveItem }) => (
    <div className="flex items-start bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-100">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 mr-4">
            {/* Discount Badge */}
            <span className="absolute top-0 left-0 bg-cta-bright text-light-creme text-xs font-bold px-2 py-0.5 rounded-br-lg rounded-tl-xl z-10">
                -{item.discount || 0}%
            </span>
            <img 
                src={`https://placehold.co/128x128/A52A2A/EAE7DC?text=Dish`} 
                alt={item.name} 
                className="w-full h-full object-cover rounded-lg" 
            />
        </div>

        <div className="flex flex-col flex-grow text-primary-dark">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <div className="flex items-center text-accent-gold text-sm mb-2">
                {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                ))}
                <span className="text-gray-500 ml-2 text-xs">({item.quantity})</span>
            </div>
            
            <div className="flex items-center mb-3">
                <span className="text-highlight-red font-bold text-xl">
                    ₹{(item.price * item.quantity).toFixed(2)}
                </span>
                <span className="text-gray-400 line-through text-sm ml-3">
                    ₹{(item.oldPrice * item.quantity).toFixed(2)}
                </span>
            </div>
            
            <div className="flex items-center justify-between mt-auto">
                {/* Quantity Control Button Group */}
                <div className="flex items-center border border-cta-bright rounded-full overflow-hidden text-light-creme">
                    <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} 
                        className="bg-cta-bright hover:bg-highlight-red px-3 py-1 font-bold transition duration-200"
                        disabled={item.quantity <= 0}
                    >
                        -
                    </button>
                    <span className="bg-white text-primary-dark px-4 py-1 font-semibold text-sm">
                        {item.quantity}
                    </span>
                    <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} 
                        className="bg-cta-bright hover:bg-highlight-red px-3 py-1 font-bold transition duration-200"
                    >
                        +
                    </button>
                </div>
                
                {/* Remove Item Button */}
                <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-500 hover:text-highlight-red transition duration-200 ml-4"
                    title="Remove Item"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.013 21H7.987a2 2 0 01-1.92-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        </div>
    </div>
);


const Cart = ({ cartItems, handleUpdateQuantity, handleRemoveItem }) => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = subtotal * 0.20; 
    const deliveryFee = 68; 
    const total = subtotal - discount + deliveryFee;

    return (
        <section className="py-20 lg:py-32 bg-light-creme min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif font-bold text-primary-dark mb-10 border-b border-gray-300 pb-2">
                    Your Cart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center text-primary-dark p-12 bg-white rounded-xl shadow-lg">
                        <p className="text-2xl font-serif font-semibold">Your cart is empty!</p>
                        <p className="text-gray-500 mt-2">Add some delicious items from the menu.</p>
                        <a href="#menu-full" className="mt-6 inline-block bg-cta-bright text-light-creme px-6 py-3 rounded-full font-bold hover:bg-highlight-red transition duration-300">
                            Go to Menu
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map(item => (
                                <CartItem 
                                    key={item.id} 
                                    item={item} 
                                    handleUpdateQuantity={handleUpdateQuantity}
                                    handleRemoveItem={handleRemoveItem}
                                />
                            ))}
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit sticky top-24">
                            <h2 className="text-xl font-serif font-bold text-primary-dark mb-4 border-b pb-2">
                                Order Summary
                            </h2>
                            <div className="text-primary-dark space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount (-20%)</span>
                                    <span className="text-highlight-red">- ₹{discount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span>₹{deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                    <span>Total</span>
                                    <span className="text-cta-bright">₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <input 
                                    type="text" 
                                    placeholder="Add promo code" 
                                    className="w-full p-2 border border-gray-300 rounded-lg text-sm text-primary-dark mb-3"
                                />
                                <button className="w-full bg-cta-bright text-light-creme px-6 py-3 rounded-lg font-bold hover:bg-highlight-red transition duration-300 text-lg">
                                    Go to Checkout →
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Cart;