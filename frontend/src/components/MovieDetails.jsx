
import React from 'react';
import MovieTrailer from './MovieTrailer';

const MovieDetails = ({ movie, onBack }) => {
    return (
        <div className="details">
            <button onClick={onBack} className="back-btn">← Back to results</button>
            <h2>{movie.Title} ({movie.Year})</h2>

            <div className="details-grid">
                <div className="details-info">
                    <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"} alt={movie.Title} />
                    <p><strong>Rated:</strong> {movie.Rated}</p>
                    <p><strong>Released:</strong> {movie.Released}</p>
                    <p><strong>Runtime:</strong> {movie.Runtime}</p>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Writer:</strong> {movie.Writer}</p>
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                    <p><strong>Language:</strong> {movie.Language}</p>
                    <p><strong>Country:</strong> {movie.Country}</p>
                    <p><strong>Awards:</strong> {movie.Awards}</p>
                </div>

                <div className="details-trailer">
                    <MovieTrailer movie={movie} />
                </div>
            </div>

            <div className="details-plot">
                <h3>Plot</h3>
                <p>{movie.Plot}</p>
            </div>
        </div>
    );
};

export default MovieDetails;