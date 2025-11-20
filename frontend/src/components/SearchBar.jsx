import React from 'react';
import SearchIcon from "../search.svg";

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch(searchTerm);
        }
    };

    return (
        <div className="search">
            <input
                placeholder="Search for movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <img
                src={SearchIcon}
                alt="search"
                onClick={() => onSearch(searchTerm)}
            />
        </div>
    );
};

export default SearchBar;