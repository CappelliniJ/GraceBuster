import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addItemToCart } from '../../app/cartSlice'
import { fetchMovies } from '../../app/movieSlice'
import { addToLocalStorageCart } from '../../app/localCartHelpers'

function Movies({ searchQuery }) {
    const dispatch = useDispatch()
    const movies = useSelector((state) => state.movies)
    const userId = useSelector((state) => state.auth.me.id)

    useEffect(() => {
        dispatch(fetchMovies())
    }, [dispatch])

    const handleAddToCart = (movie) => {
        if (userId) {
            dispatch(addItemToCart({ userId, movieId: movie.id }))
        } else {
            addToLocalStorageCart(movie)
        }
    }

    const filteredMovies = movies.filter((movie) =>
        movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="movie-container">
            {filteredMovies.map((movie) => (
                <div className="movies" key={movie.id}>
                    <NavLink to={`/movies/${movie.id}`}>
                        <img
                            className="movie-images"
                            src={movie.ImageUrl}
                            alt={movie.Title}
                        />
                        <h2>{movie.Title}</h2>
                        <h3>Price: ${movie.Price}</h3>
                    </NavLink>
                    <button
                        className="movies-btn"
                        onClick={() => handleAddToCart(movie)}
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Movies
