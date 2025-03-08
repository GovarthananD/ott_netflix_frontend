import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={movie.image || "https://via.placeholder.com/200x300"} 
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
      <p>Rating: {movie.rating}</p>
    </div>
  );
};

export default MovieCard;
