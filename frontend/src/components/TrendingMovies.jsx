import React from 'react';
import MovieCard from './MovieCard';

const TrendingMovies = ({ movies, onSelectMovie }) => {
    return (
        <>
            <h2 className="section-title">Trending Now</h2>
            <div className="container">
                {movies.map((movie) => (
                    <MovieCard    // displays he movie perview details
                        key={movie.imdbID}
                        movie={movie}
                        onSelectMovie={onSelectMovie}
                    />
                ))}
            </div>
        </>
    );
};

export default TrendingMovies;