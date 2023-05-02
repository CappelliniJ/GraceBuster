import React from 'react'
import Footer from '../footer/Footer'

const Contact = () => {
    return (
        <>
            <div className="contact-container">
                <div id="contact-title">
                    <h1>Lets talk movies!</h1>
                    <p>
                        Contact us here or in person at any of our brick and
                        mortar locations!
                    </p>
                </div>
                <div id="contact-info">
                    <h3>Movie Expert Bar:</h3>
                    <ul>
                        <li>Phone: 555-555-5555</li>
                        <li>Email: email@email.com</li>
                    </ul>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Contact
