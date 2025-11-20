import React from 'react';
import MovieCard from './MovieCard';

const SearchResults = ({ movies, searchTerm, onSelectMovie }) => {
    return (
        <>
            <h2 className="section-title">Searched: {searchTerm}</h2>
            <div className="container">
                {movies.map((movie) => (
                    <MovieCard  // displays he movie perview details
                        key={movie.imdbID}
                        movie={movie}
                        onSelectMovie={onSelectMovie}
                    />
                ))}
            </div>
        </>
    );
};

export default SearchResults;