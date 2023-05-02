// this component will display once a user has clicked 'Checkout' in the cart 
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';

const OrderPlaced = () => {
    return (
        <>
            <div className="order-placed-container">
                <div id='order-title'>
                    <h1>Order Placed!</h1>
                    <h3>Thank you for shopping with us!</h3>
                </div>
                <div>
                    <p>if you have any questions feel free to <Link to='/contact' id='contact-link'>contact</Link> us below!</p>
                </div>
            </div>
            <footer>
                <Footer/>
            </footer>
        </>
    )
};

export default OrderPlaced;