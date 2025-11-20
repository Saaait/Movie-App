import React from 'react';

const MovieCard = ({ movie, onSelectMovie }) => {
    return (
        <div className="movie" onClick={() => onSelectMovie(movie.imdbID)}>
            <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"}
                alt={movie.Title}
            />
            <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year} — {movie.Type}</p>
            </div>
        </div>
    );
};

export default MovieCard;