import React from 'react';

const Footer = () => {
    return (
        <div>
           
            <footer className="bg-black text-white py-6 text-center">
                <p>&copy; {new Date().getFullYear()} TourEvent. All rights reserved.</p>
            </footer>


        </div>
    );
};

export default Footer;