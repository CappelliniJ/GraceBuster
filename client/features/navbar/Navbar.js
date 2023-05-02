import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../app/store'

const Navbar = () => {
    const isLoggedIn = useSelector((state) => !!state.auth.me.id)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutAndRedirectHome = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div>
            <nav className="navbar">
                {isLoggedIn ? (
                    <div className="navbar-container">
                        <Link to="/home">
                            <img src="/gracebuster-logo.png" className="logo" />
                        </Link>
                        <Link to="/shop">
                            Shop <i className="fa-solid fa-cassette-tape"></i>
                        </Link>
                        <Link to="/account">Account</Link>
                        <button
                            className="logout-btn"
                            type="button"
                            onClick={logoutAndRedirectHome}
                        >
                            Logout
                        </button>
                        <Link to="/cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                            Cart
                        </Link>
                    </div>
                ) : (
                    <div className="navbar-container">
                        <Link to="/home">
                            <img src="/gracebuster-logo.png" className="logo" />
                        </Link>
                        <div className="nav-right">
                            <Link to="/shop">Shop</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                            <Link to="/cart">
                                <i className="fa-solid fa-cart-shopping"></i>
                                Cart
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default Navbar
