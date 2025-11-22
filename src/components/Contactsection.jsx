import React from 'react';

const Contactsection = ({ handleReservationSubmit, isLoading, isAuthReady }) => {
    return (
        <>
            {/* Reservation Page Section */}
            <section id="reservation-page" className="py-20 lg:py-32 bg-primary-dark/95" 
                style={{ backgroundImage: "url('https://as1.ftcdn.net/v2/jpg/07/54/93/70/1000_F_754937013_Tvqma7ELVFvzdXAqJqzcxI90gpwIoD4l.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="oklch(97.7% 0.017 320.058)">
                        
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-serif font-bold text-primary-dark">
                                <span className="inline-block relative pb-1">
                                    Reserve a Table
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-gold rounded-full"></div>
                                </span>
                            </h2>
                        </div>

                        <form onSubmit={handleReservationSubmit} className="space-y-6">
                            
                            {/* 1. Number of Guests (Full Width) */}
                            <div>
                                <label htmlFor="res-guests" className="sr-only">No of Guest</label>
                                <input type="number" id="res-guests" name="guests" min="1" max="12" required 
                                        className="w-full form-input shadow-inner" 
                                        placeholder="No of Guest" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* 2. Full Name (Half Width) */}
                                <div>
                                    <label htmlFor="res-name" className="sr-only">Full Name</label>
                                    <input type="text" id="res-name" name="name" required 
                                            className="w-full form-input shadow-inner" 
                                            placeholder="Full Name" />
                                </div>
                                {/* 3. Phone No (Half Width) */}
                                <div>
                                    <label htmlFor="res-mobile" className="sr-only">Phone No</label>
                                    <input type="tel" id="res-mobile" name="mobile" required 
                                            className="w-full form-input shadow-inner" 
                                            placeholder="Phone No" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* 4. Date (Half Width) */}
                                <div>
                                    <label htmlFor="res-date" className="sr-only">Date</label>
                                    <input type="text" id="res-date" name="date" required 
                                            className="w-full form-input shadow-inner" 
                                            placeholder="Date (e.g., 12/25/2025)" />
                                </div>
                                {/* 5. Time (Half Width) */}
                                <div>
                                    <label htmlFor="res-time" className="sr-only">Time</label>
                                    <input type="text" id="res-time" name="time" required 
                                            className="w-full form-input shadow-inner" 
                                            placeholder="Time (e.g., 7:30 PM)" />
                                </div>
                            </div>

                            {/* 6. Submit Button */}
                            <button type="submit" disabled={isLoading || !isAuthReady} className={`w-full bg-cta-bright text-light-creme px-6 py-4 rounded-lg text-xl font-bold transition duration-300 shadow-xl mt-4 relative transform hover:scale-[1.01] ${isLoading || !isAuthReady ? 'opacity-60 cursor-not-allowed' : 'hover:bg-highlight-red'}`}>
                                <span className={isLoading ? 'invisible' : 'visible'}>Book Now</span>
                                {/* Loading Spinner */}
                                {isLoading && (
                                    <span className="absolute inset-0 flex items-center justify-center bg-cta-bright/90 rounded-lg">
                                        <svg className="animate-spin h-5 w-5 text-light-creme" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </span>
                                )}
                            </button>
                            {!isAuthReady && <p className="text-center text-sm text-highlight-red">Connecting to service...</p>}
                        </form>
                    </div>
                </div>
            </section>
            
            {/* Subscribe & Media Section */}
            <section id="media-subscribe" className="py-16 bg-card-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Subscribe Form */}
                    <div>
                        <h3 className="text-3xl font-serif font-bold text-accent-gold mb-3">Subscribe</h3>
                        <p className="text-light-creme/70 mb-4">Join our newsletter for weekly specials and events.</p>
                        <form className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                            <input type="email" placeholder="Enter your email" required 
                                    className="flex-grow p-3 rounded-lg bg-primary-dark border border-accent-gold/50 text-light-creme placeholder-light-creme/50 focus:border-cta-bright focus:ring focus:ring-cta-bright/30" />
                            <button type="submit" className="bg-cta-bright text-light-creme px-6 py-3 rounded-lg font-bold hover:bg-highlight-red transition duration-300 shadow-lg">
                                Subscribe
                            </button>
                        </form>
                    </div>
                    
                    {/* Media Links */}
                    <div>
                        <h3 className="text-3xl font-serif font-bold text-accent-gold mb-3">Media</h3>
                        <p className="text-light-creme/70 mb-4">Follow us on social media: @culinaryhaven</p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-light-creme hover:text-accent-gold transition duration-300">
                                {/* Facebook Icon */}
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.143 3.791 9.423 8.752 10.158v-7.158H8.25V12h2.502V9.742c0-2.483 1.498-3.844 3.737-3.844 1.056 0 2.152.188 2.152.188V8.75h-1.215c-1.205 0-1.583.753-1.583 1.53V12h2.898l-.465 3.158h-2.433v7.158C18.209 21.423 22 17.143 22 12c0-5.523-4.477-10-10-10z"/></svg>
                            </a>
                            <a href="#" className="text-light-creme hover:text-accent-gold transition duration-300">
                                {/* Instagram Icon */}
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c2.716 0 3.056.01 4.122.06c1.066.048 1.791.22 2.427.465.65.253 1.17.625 1.666 1.121s.868 1.016 1.121 1.666c.245.636.417 1.36.465 2.427.05 1.066.06 1.406.06 4.122s-.01 3.056-.06 4.122c-.048 1.066-.22 1.791-.465 2.427-.253.65-.625 1.17-1.121 1.666s-1.016.868-1.666 1.121c-.636.245-1.36.417-2.427.465-1.066.05-1.406.06-4.122.06s-3.056-.01-4.122-.06c-1.066-.048-1.791-.22-2.427-.465-.65-.253-1.17-.625-1.666-1.121s-.868-1.016-1.121-1.666c-.245-.636-.417-1.36-.465-2.427-.05-1.066-.06-1.406-.06-4.122s.01-3.056.06-4.122c.048-1.066.22-1.791.465-2.427.253-.65.625-1.17 1.121-1.666s1.016-.868 1.666-1.121c.636-.245 1.36-.417 2.427-.465C8.944 2.01 9.284 2 12 2zm0 18a8 8 0 100-16 8 8 0 000 16zm0-12a4 4 0 110 8 4 4 0 010-8zm6.5-1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contactsection;