import React from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieDetails from "./components/MovieDetails";
import TrendingMovies from "./components/TrendingMovies";
import SearchResults from "./components/SearchResults";
import NoResults from "./components/NoResults";
import useMovies from "./hooks/useMovies";

function App() {
  const {
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
  } = useMovies();

  return (
    <div className="app">
      <Header onGoHome={handleGoHome} />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />

      <p className="description">
        Welcome to PlotPlay! Catch the Plot, Play the Trailer, and discover your favorite movies with detailed plot summaries, trailers, and more, all in one place
      </p>

      {selectedMovie ? (
        <MovieDetails
          movie={selectedMovie}
          onBack={() => setSelectedMovie(null)}
        />
      ) : (!searched ? (
        <TrendingMovies
          movies={trendingMovies}
          onSelectMovie={handleSelectMovie}
        />
      ) : (
        movies.length > 0 ? (
          <SearchResults
            movies={movies}
            searchTerm={searchTerm}
            onSelectMovie={handleSelectMovie}
          />
        ) : (
          <NoResults />
        )
      ))}
    </div>
  );
}

export default App;