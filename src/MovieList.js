import React, { useState } from 'react';
import FavoriteList from './FavoriteList';

const MovieList = props => {
  // component code goes here

  const [isOpen, setIsOpen] = useState(true);
  const { movies } = props;
  const [ favoriteMovies, setFavoriteMovies ] = useState([])
  
  const addToFavorites = movie => {
    setFavoriteMovies([...favoriteMovies, movie]);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  //const { movies } = props;
  const Movie = props => {
    const { movie } = props;
    return (
      <div>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
      </div>
    );
  };
  return (
    <div>
        <div>
      <button onClick={toggleDropdown}>Toggle Dropdown</button></div>
      {isOpen && (
        <ul style={{ position: 'absolute', zIndex: 1, backgroundColor: 'white', border: '1px solid', overflow: 'auto', maxHeight: '70vh' }}>
          {movies.map(movie => (
            <li key={movie.id} style={{ listStyle: 'none', padding: '10px', width: '300px', borderBottom: '1px solid' }}>
              <Movie movie={movie} />
              <button onClick={() => addToFavorites(movie)}>Add to Favorites</button>
            </li>
            
          ))}
        </ul>
      )}
      <div>
        <FavoriteList fMovies={favoriteMovies} />;
      </div>
    </div>
  );
  
};

export default MovieList;
