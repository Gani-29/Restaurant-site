import React from 'react';

// Reusable components
const NavLink = ({ href, children, isCta = false, onClick }) => (
    <a 
        href={href} 
        onClick={onClick}
        className={`
            text-light-creme hover:text-accent-gold transition duration-300 rounded-lg p-2 
            ${isCta ? 'bg-accent-gold text-primary-dark px-5 py-2 rounded-full font-semibold hover:bg-highlight-red hover:text-light-creme shadow-lg' : ''}
        `}
    >
        {children}
    </a>
);

const MobileNavLink = ({ href, children, onClick }) => (
    <a 
        href={href} 
        onClick={onClick}
        className="block text-light-creme hover:bg-accent-gold/20 p-2 rounded-md"
    >
        {children}
    </a>
);

const Header = ({ setPage, cartItemsCount, isMenuOpen, toggleMenu }) => {
    
    // Helper to navigate and close mobile menu
    const handleNavigation = (targetPage, event, hash = '') => {
        if (event) event.preventDefault();
        setPage(targetPage);
        toggleMenu(); 
        if (hash) window.location.hash = hash;
    };

    return (
        <nav className="sticky top-0 z-50 bg-primary-dark/95 shadow-lg backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <a href="#" onClick={(e) => handleNavigation('home', e)} className="flex-shrink-0 text-3xl font-serif font-bold text-accent-gold tracking-wider">
                        Culinary Haven
                    </a>
                    <div className="hidden md:flex space-x-8 items-center">
                        <NavLink href="#" onClick={(e) => handleNavigation('home', e)}>Home</NavLink>
                        <NavLink href="#menu-full" onClick={(e) => handleNavigation('home', e, 'menu-full')}>Menu</NavLink>
                        <NavLink href="#specials" onClick={(e) => handleNavigation('home', e, 'specials')}>Specials</NavLink>
                        <NavLink href="#testimonial-section" onClick={(e) => handleNavigation('home', e, 'testimonial-section')}>Reviews</NavLink>
                        
                        {/* Cart Icon */}
                        <button 
                            onClick={() => setPage('cart')} 
                            className="relative p-2 rounded-full hover:bg-accent-gold/20 transition duration-300"
                            title="View Cart"
                        >
                            <svg className="w-6 h-6 text-light-creme" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            {cartItemsCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-light-creme transform translate-x-1/2 -translate-y-1/2 bg-cta-bright rounded-full">
                                    {cartItemsCount}
                                </span>
                            )}
                        </button>
                        
                        <NavLink href="#reservation-page" isCta={true} onClick={(e) => handleNavigation('home', e, 'reservation-page')}>Book a Table</NavLink>
                    </div>
                    <div className="md:hidden">
                        <button id="mobile-menu-button" onClick={toggleMenu} className="text-light-creme hover:text-accent-gold p-2 rounded-lg focus:outline-none" aria-expanded={isMenuOpen}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div id="mobile-menu" className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute w-full bg-primary-dark/95 shadow-xl`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                    <MobileNavLink href="#" onClick={() => handleNavigation('home')}>Home</MobileNavLink>
                    <MobileNavLink href="#menu-full" onClick={() => handleNavigation('home', null, 'menu-full')}>Menu</MobileNavLink>
                    <MobileNavLink href="#specials" onClick={() => handleNavigation('home', null, 'specials')}>Specials</MobileNavLink>
                    <MobileNavLink href="#testimonial-section" onClick={() => handleNavigation('home', null, 'testimonial-section')}>Reviews</MobileNavLink>
                    <MobileNavLink href="#" onClick={() => handleNavigation('cart')}>
                        Cart ({cartItemsCount})
                    </MobileNavLink>
                    <NavLink href="#reservation-page" isCta={true} onClick={() => handleNavigation('home', null, 'reservation-page')} className="w-full mt-2">Book a Table</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Header;