
import React, { useState, useEffect } from 'react';
import { fetchYouTubeTrailer, getYouTubeSearchUrl } from '../services/api';

const MovieTrailer = ({ movie }) => {
    const [trailerVideoId, setTrailerVideoId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadTrailer = async () => {
            try {
                setLoading(true);
                setError(false);

                // Using the YouTube API to fetch a trailer
                const videoId = await fetchYouTubeTrailer(movie.Title, movie.Year);

                if (videoId) {
                    setTrailerVideoId(videoId);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Error loading trailer:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadTrailer();
    }, [movie.Title, movie.Year]);

    // Generate YouTube embed URL using direct video ID
    const youtubeEmbedUrl = trailerVideoId
        ? `https://www.youtube.com/embed/${trailerVideoId}?autoplay=0&origin=${window.location.origin}`
        : "";

    // Generate a search URL for fallback
    const youtubeSearchUrl = getYouTubeSearchUrl(movie.Title, movie.Year);

    return (
        <div className="movie-trailer">
            <h3>Movie Trailer</h3>
            <div className="trailer-container">
                {loading && (
                    <div className="trailer-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading trailer...</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="trailer-error">
                        <p>Trailer not available</p>
                        <a
                            href={youtubeSearchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="trailer-search-link"
                        >
                            Search on YouTube
                        </a>
                    </div>
                )}

                {!loading && trailerVideoId && (
                    <iframe
                        src={youtubeEmbedUrl}
                        title={`${movie.Title} Trailer`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
            </div>
        </div>
    );
};


export default MovieTrailer;