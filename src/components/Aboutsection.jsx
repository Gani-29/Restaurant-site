import React from 'react';

const AboutSection = () => (
    <>
        <header id="home" className="h-screen flex items-center justify-center text-center px-4" 
            style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1705056547423-de4ef0f85bf7?q=80&w=1163&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
            
            <div className="bg-primary-dark/70 p-8 sm:p-12 rounded-xl shadow-2xl max-w-4xl border-2 border-accent-gold/50 text-light-creme"> 
                
                <p className="text-lg uppercase tracking-widest text-accent-gold mb-4 font-semibold">The Best Food Collection 2025</p>
                
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-6 text-light-creme">
                    Feel The Taste of <span className="text-accent-gold">Foods</span>
                </h1>
                
                <p className="text-xl text-light-creme/90 mb-8 max-w-2xl mx-auto">
                    Where every dish is a masterpiece and every visit is an unforgettable journey of taste.
                </p>
                
                <div className="flex justify-center space-x-4">
                    
                    <a href="#menu-full" className="bg-cta-bright text-primary-dark px-8 py-3 rounded-full text-lg font-bold hover:bg-highlight-red transition duration-300 shadow-xl transform hover:scale-105">
                        Order Now
                    </a>
                    
                    <a href="#reservation-page" className="border border-primary-dark/50 text-primary-dark px-8 py-3 rounded-full text-lg font-bold hover:bg-light-creme/10 transition duration-300 shadow-xl transform hover:scale-105">
                        Reserve Now
                    </a>
                </div>
            </div>
        </header>
        
        ---

        {/* Restaurant Section: Chef & Intro */}
        <section id="restaurant-section" className="py-20 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
                <div className="flex flex-col items-center">
                    <img src="https://img-cdn.thepublive.com/filters:format(webp)/elle-india/media/post_attachments/58bf0e94-d67.jpg" alt="Chef Julian" className="rounded-full w-36 h-36 object-cover border-4 border-accent-gold shadow-lg mb-3" />
                    <p className="text-lg font-serif font-semibold text-accent-gold">Chef Julian</p>
                    <p className="text-light-creme/70 text-sm">Main Chef</p>
                </div>
                <div className="md:col-span-1">
                    <p className="text-lg uppercase tracking-widest text-accent-gold mb-2 font-semibold">Restaurant Section</p>
                    <h2 className="text-5xl font-serif font-bold text-light-creme">Feel The Taste <br />of Foods</h2>
                </div>
                <div className="flex flex-col items-center">
                    <img src="https://img-cdn.thepublive.com/filters:format(webp)/elle-india/media/post_attachments/99377e22-54f.jpg" alt="Chef Maria" className="rounded-full w-36 h-36 object-cover border-4 border-accent-gold shadow-lg mb-3" />
                    <p className="text-lg font-serif font-semibold text-accent-gold">Chef Maria</p>
                    <p className="text-light-creme/70 text-sm">Sous Chef</p>
                </div>
            </div>
        </section>

        ---
        
        {/* Specials Section (Horizontal Scroll) */}
        <section id="specials" className="py-20 lg:py-32 bg-primary-dark/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-lg uppercase tracking-widest text-accent-gold mb-3 font-semibold">Specials</p>
                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-light-creme mb-12">Weekly Dishes</h2>
                
                <div className="horizontal-scroll-container">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="scroll-item flex flex-col sm:flex-row items-center bg-card-dark p-6 rounded-xl shadow-2xl border border-cta-bright/30">
                            <img src={`https://b.zmtcdn.com/data/pictures/9/19207899/20d68d12ec495c8e9d70ef2b4c3384ae_featured_v2.jpg`} alt={`Food Special ${i}`} className="w-24 h-24 object-cover rounded-full mr-6 mb-4 sm:mb-0 border-4 border-cta-bright/50" />
                            <div className="text-left flex-grow">
                                <h3 className="text-xl font-serif font-semibold text-light-creme mb-1">Mutton Biryani {i}</h3>
                                <p className="text-light-creme/70 text-sm mb-3">A delicious main course.</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-cta-bright">₹ {((19 + i * 5) * 80).toFixed(0)}</span>
                                    <button className="bg-cta-bright text-light-creme px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-highlight-red transition duration-300">
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </>
);

export default AboutSection;