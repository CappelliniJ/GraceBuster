import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Aos from 'aos'

const Featured = ({ movieIds }) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const fetchedMovies = []
                for (const id of movieIds) {
                    const { data } = await axios.get(`/api/movies/${id}`)
                    fetchedMovies.push(data)
                }
                setMovies(fetchedMovies)
            } catch (error) {
                console.log(error)
            }
        }
        fetchFeatured()
    }, [movieIds])

    useEffect(() => {
        Aos.init({
            duration: 500,
            delay: 100,
        })
    }, [])

    return (
        <div className="movie-container">
            {movies.map((movie, index) => (
                <div
                    key={movie.id}
                    className="movies"
                    data-aos-delay={`${index * 400}`}
                    data-aos="flip-right"
                >
                    <NavLink to={`/movies/${movie.id}`}>
                        <img class="movie-images" src={movie.ImageUrl} />
                        <h2>{movie.Title}</h2>
                        <h3>Price: ${movie.Price}</h3>
                    </NavLink>
                </div>
            ))}
        </div>
    )
}

export default Featured
