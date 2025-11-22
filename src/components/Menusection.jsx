import React from 'react';

const menuCategories = [
    { name: 'Biryani Specials', dishes: Array(5).fill(0).map((_, i) => ({
        id: `fc${i}`,
        name: `Mutton Biryani ${i + 1}`,
        currentPrice: 799,
        oldPrice: 1000, 
        discount: 20,
        rating: 4.5
    })) },
    { name: 'Chef Specials', dishes: Array(5).fill(0).map((_, i) => ({
        id: `cs${i}`,
        name: `Mutton Biryani ${i + 1}`,
        currentPrice: 350,
        oldPrice: 400,
        discount: 12,
        rating: 4.8
    })) },
];

const MenuItemCard = ({ dish, handleAddToCart }) => (
    <div className="scroll-item w-48 sm:w-56 flex-shrink-0 bg-dark-card-bg rounded-xl shadow-lg border border-light-creme/10 relative p-3 mr-4">
        {/* Discount Badge */}
        <span className="absolute top-0 left-0 bg-cta-bright text-light-creme text-xs font-bold px-2 py-0.5 rounded-br-lg rounded-tl-xl z-10">
            -{dish.discount}%
        </span>
  
        <img 
            src={'https://b.zmtcdn.com/data/pictures/9/19207899/20d68d12ec495c8e9d70ef2b4c3384ae_featured_v2.jpg'} 
            alt={dish.name} 
            className="w-full h-32 object-cover rounded-lg mb-3" 
        />
        
        <div className="text-left">
            {/* Rating */}
            <div className="flex items-center text-accent-gold text-xs mb-1">
                {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                ))}
            </div>

            <p className="text-sm font-semibold text-light-creme mb-2 leading-tight">
                {dish.name}
            </p>

            <div className="flex justify-between items-center mt-2">
                <div className="flex flex-col text-sm">
                    <span className="text-cta-bright font-bold">
                        ₹ {dish.currentPrice.toFixed(0)}
                    </span>
                    <span className="text-light-creme/50 line-through text-xs">
                        ₹ {dish.oldPrice.toFixed(0)}
                    </span>
                </div>
                
                <button 
                    className="bg-cta-bright text-light-creme text-xs font-bold px-3 py-1 rounded-full hover:bg-highlight-red transition duration-200 uppercase"
                    onClick={() => handleAddToCart(dish)}
                >
                    ADD
                </button>
            </div>
        </div>
    </div>
);

const MenuSection = ({ handleAddToCart }) => {
    
    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        console.log("Searching for:", query);
    };
    
    return (
        <section id="menu-full" className="py-20 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="mb-16">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="w-full sm:w-2/3 lg:w-1/2 relative">
                        <input 
                            type="text" 
                            name="search"
                            placeholder="SEARCH" 
                            className="w-full bg-dark-input text-light-creme p-3 pl-12 rounded-full border border-light-creme/20 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold placeholder-light-creme/50 text-lg font-serif" 
                        />
                        {/* Search Icon */}
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </form>

                    {/* Category Filters */}
                    <div className="flex space-x-3 overflow-x-auto pb-2 sm:pb-0 sm:overflow-x-visible">
                        {['VEG', 'NON-VEG', 'DRINKS'].map((filter, i) => (
                            <button key={i} className="flex-shrink-0 bg-dark-card-bg text-light-creme px-4 py-2 rounded-full border border-light-creme/20 text-sm hover:bg-accent-gold hover:text-primary-dark transition duration-200">
                                {filter}
                                <span className="ml-2 inline-block">
                                    <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Categories Rows */}
            {menuCategories.map((category, index) => (
                <div key={index} className="mb-16">
                    {/* Category Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-3xl font-serif font-bold text-light-creme">
                            {category.name}
                        </h3>
                        {/* Navigation Arrows  */}
                        <div className="flex space-x-3 text-light-creme">
                            <button className="hover:text-accent-gold transition duration-200">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            </button>
                            <button className="hover:text-accent-gold transition duration-200">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>

                    {/* Dishes Row (Horizontal Scroll) */}
                    <div className="menu-scroll-row flex">
                        {category.dishes.map(dish => (
                            <MenuItemCard key={dish.id} dish={dish} handleAddToCart={handleAddToCart} />
                        ))}
                    </div>
                </div>
            ))}

        </section>
    );
};

export default MenuSection;