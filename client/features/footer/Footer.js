import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className="footer-container">
                <p>© 2023 GraceBuster |</p>
                <button className="contact-btn">
                    <Link to="/contact">Contact</Link>
                </button>
            </div>
        </>
    )
}

export default Footer

// footer will be present in each component in its own <footer> element
