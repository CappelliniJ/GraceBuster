import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleMovie } from "../../app/singleMovieSlice";
import { addItemToCart } from "../../app/cartSlice";
import Footer from "../footer/Footer";
import { addToLocalStorageCart } from "../../app/localCartHelpers";

function SingleMovie() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.singleMovie);
  const userId = useSelector((state) => state.auth.me.id);

  useEffect(
    () => {
      dispatch(fetchSingleMovie(id));
    },
    [dispatch],
    id
  );

  const handleAddToCart = (movie) => {
    if (userId) {
      dispatch(addItemToCart({ userId, movieId: movie.id }));
    } else {
      addToLocalStorageCart(movie);
    }
  };

  return (
    <>
      <div className="single-movie-container">
        <h1 className="single-movie-title">{movie.Title}</h1>
        <img className="single-movie-image" src={movie.ImageUrl} />
        <h3>Description:</h3>
        <p>{movie.Description}</p>
        <h3>Price: ${movie.Price}</h3>
        <button
          className="single-movie-btn"
          onClick={() => {
            handleAddToCart(movie);
          }}
        >
          Add to Cart
        </button>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default SingleMovie;
