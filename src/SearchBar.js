import React, { useState } from 'react';
import MovieList from './MovieList';

const SearchBar = () => {
  // component code goes here
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const YOUR_API_KEY = "c137c3a1a3b8d29bd41a87a70dacbb3c"

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${YOUR_API_KEY}&query=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        // Do something with the data here
        setSearchResults(data.results);
      });
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search for a movie..." value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} />
        </form>
        {searchResults.length > 0 && <MovieList movies={searchResults} />}
    </div>
  );
};

export default SearchBar;
