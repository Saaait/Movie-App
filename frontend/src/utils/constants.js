export const OMDB_BASE_URL = "https://www.omdbapi.com/";
export const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const IMDB_TRENDING_URL =
    "https://imdb8.p.rapidapi.com/title/get-most-popular-movies";

export const RAPIDAPI_HEADERS = {
    // IMDB(via rapid)-api-key
    "X-RapidAPI-Key": import.meta.env.VITE_IMDB_RAPID_API_KEY,
    "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
};

export const YOUTUBE_API_KEY = import.meta.env.VITE_YT_API_KEY;
