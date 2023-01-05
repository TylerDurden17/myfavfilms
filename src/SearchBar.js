import React, { useState } from 'react';
import MovieList from './MovieList';
//require('dotenv').config();
const REACT_APP_themoviedb_API_KEY = process.env.REACT_APP_themoviedb_API_KEY;
const SearchBar = () => {
  // component code goes here
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const YOUR_API_KEY = `${REACT_APP_themoviedb_API_KEY}`
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
      <div className='search-bar'>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search for a movie..." value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} />
            <button type="submit">Search</button>
        </form>
      </div>
        {searchResults.length > 0 && <MovieList movies={searchResults} />}
    </div>
  );
};

export default SearchBar;