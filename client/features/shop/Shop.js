import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../footer/Footer'
import Movies from '../movies/Movies'

const Shop = () => {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <>
            <div >
                <div className="homepage-title">
                    <input
                        type="text"
                        placeholder="Search movie..."
                        className="search-bar"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    ></input>
                    <h1>Browse our Titles!</h1>
                    <p>search through many popular movies!</p>
                </div>
                <Movies searchQuery={searchQuery} />
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Shop
