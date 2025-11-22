import React from 'react';

const Testimonials = () => (
    <section id="testimonial-section" className="py-20 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <p className="text-lg uppercase tracking-widest text-accent-gold mb-3 font-semibold">Testimonial</p>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-light-creme">What Our Customers Say</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-card-dark/70 p-8 rounded-xl shadow-xl border border-light-creme/10">
                <p className="text-light-creme/90 italic mb-6 leading-relaxed">
                    "The dining experience at Gani's Resto was exceptional. From the moment we walked in, the service was impeccable, and the Prime Aged Ribeye was hands down the best I've ever tasted. Highly recommend for any special occasion."
                </p>
                <div className="flex items-center">
                    <img src="https://as1.ftcdn.net/v2/jpg/03/45/60/48/1000_F_345604895_jxCVsxv911L4Mxg7tocPDhYvQaSYPi0z.jpg" alt="Customer Jane Doe" className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-accent-gold" />
                    <div>
                        <p className="font-semibold text-accent-gold">Jane Doe</p>
                        <p className="text-sm text-light-creme/60">Food Enthusiast</p>
                    </div>
                </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-card-dark/70 p-8 rounded-xl shadow-xl border border-light-creme/10">
                <p className="text-light-creme/90 italic mb-6 leading-relaxed">
                    "A true culinary journey! The Velvet Beetroot Soup was an unexpected delight, and the atmosphere is wonderfully elegant yet welcoming. We booked a table for four and everything was perfect. We will definitely be back."
                </p>
                <div className="flex items-center">
                    <img src="https://as1.ftcdn.net/v2/jpg/03/45/60/48/1000_F_345604895_jxCVsxv911L4Mxg7tocPDhYvQaSYPi0z.jpg" alt="Customer Mark King" className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-accent-gold" />
                    <div>
                        <p className="font-semibold text-accent-gold">Mark King</p>
                        <p className="text-sm text-light-creme/60">Local Critic</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Testimonials;