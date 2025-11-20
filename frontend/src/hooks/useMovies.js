import { useState, useEffect } from 'react';
import { fetchTrendingMovies, searchMovies, fetchMovieDetails } from '../services/api';

const useMovies = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searched, setSearched] = useState(false);
    const [trendingMovies, setTrendingMovies] = useState([]);

    // Load trending movies on initial render
    useEffect(() => {
        const loadTrendingMovies = async () => {
            const trending = await fetchTrendingMovies();
            setTrendingMovies(trending);
        };

        loadTrendingMovies();

        if (!searched) {
            document.querySelector(".description")?.classList.add("visible");
        }
    }, []);

    // Handle search functionality
    const handleSearch = async (title) => {
        if (!title.trim()) return;

        setSearched(true);
        const searchResults = await searchMovies(title);
        setMovies(searchResults);
        setSelectedMovie(null);
    };

    // Fetch and set selected movie details
    const handleSelectMovie = async (imdbID) => {
        const details = await fetchMovieDetails(imdbID);
        setSelectedMovie(details);
    };

    // Reset to home page
    const handleGoHome = () => {
        setSearched(false);
        setSelectedMovie(null);
        setSearchTerm("");
        setMovies([]);
    };

    return {
        searchTerm,
        setSearchTerm,
        movies,
        selectedMovie,
        setSelectedMovie,
        searched,
        trendingMovies,
        handleSearch,
        handleSelectMovie,
        handleGoHome
    };
};

export default useMovies;