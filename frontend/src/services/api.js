import {
    OMDB_BASE_URL,
    OMDB_API_KEY,
    IMDB_TRENDING_URL,
    RAPIDAPI_HEADERS,
    YOUTUBE_API_KEY
} from '../utils/constants';

// Fetch trending movies from IMDB API
export const fetchTrendingMovies = async () => {
    try {
        const response = await fetch(IMDB_TRENDING_URL, {
            method: "GET",
            headers: RAPIDAPI_HEADERS,
        });

        const data = await response.json();
        console.log(data); // show data in console (complex)

        if (Array.isArray(data)) {
            const movieIds = data.slice(0, 35); // shows Top 32 trending movies
            const movieDetails = await Promise.all(
                movieIds.map(async (id) => {
                    const imdbId = id.split("/")[2]; // "/title/tt1234567/" → "tt1234567"
                    const res = await fetch(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${imdbId}`);
                    return res.json();
                })
            );
            return movieDetails.filter(m => m.Response === "True");
        }
        return [];
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        return [];
    }
};

// Search movies by title
export const searchMovies = async (title) => {
    try {
        const response = await fetch(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${title}`);
        const data = await response.json();
        console.log(data); // show data in console

        if (data.Response === "True") {
            return data.Search;
        }
        return [];
    } catch (error) {
        console.error("Error searching movies:", error);
        return [];
    }
};

// Fetch detailed information for a specific movie
export const fetchMovieDetails = async (imdbID) => {
    try {
        const response = await fetch(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${imdbID}&plot=full`);
        const data = await response.json();
        console.log(data); // show data in console
        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
};

// Method using YouTube Data API directly
export const fetchYouTubeTrailer = async (movieTitle, year) => {
    try {
        // Format search query to include movie title and year for better results
        const searchQuery = `${movieTitle} ${year} official trailer`;
        const encodedSearchQuery = encodeURIComponent(searchQuery);

        // We're specifically searching for videos in the "Trailers" category (categoryId=24) 
        // and filtering to only return videos (not playlists or channels)
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodedSearchQuery}&type=video&videoEmbeddable=true&key=${YOUTUBE_API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            console.log("Found YouTube trailer ID:", videoId);
            return videoId;
        }

        console.log("No YouTube results found for:", searchQuery);
        return null;
    } catch (error) {
        console.error("Error fetching YouTube trailer:", error);
        return null;
    }
};

// Backup method that doesn't require API keys but is less reliable
export const getYouTubeSearchUrl = (movieTitle, year) => {
    const searchQuery = `${movieTitle} ${year} official trailer`;
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
};
