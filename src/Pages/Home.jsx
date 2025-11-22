import React from 'react';
import Aboutsection from '../components/Aboutsection.jsx';
import Menusectton from '../components/Menusection.jsx';
import Testimonials from '../components/Testimonals.jsx';
import Contactsection from '../components/Contactsection.jsx';

const Home = ({ handleAddToCart, handleReservationSubmit, isLoading, isAuthReady }) => {
    return (
        <>
            <Aboutsection />
            <Menusectton handleAddToCart={handleAddToCart} />
            <Contactsection 
                handleReservationSubmit={handleReservationSubmit} 
                isLoading={isLoading}
                isAuthReady={isAuthReady}
            />
            <Testimonials />
        </>
    );
};

export default Home;