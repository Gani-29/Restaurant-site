import React from 'react';

const Footer = ({ isAuthReady, userId, page }) => {
    return (
        <footer className={`bg-primary-dark/90 border-t border-accent-gold/20 py-10 ${page === 'cart' ? 'mt-auto' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h4 className="text-3xl font-serif font-bold text-accent-gold tracking-wider mb-3">Gani's Resto</h4>
                <p id="user-id-display" className={`text-light-creme/60 text-xs mb-4 ${!isAuthReady ? 'animate-pulse' : ''}`}>
                    User ID: {isAuthReady ? userId : 'Initializing...'}
                </p>
                <p className="text-light-creme/50 text-sm">
                    &copy; 2025 Gani's Resto. All rights reserved. 
                </p>
            </div>
        </footer>
    );
};

export default Footer;