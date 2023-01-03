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
        <h4>{movie.title}</h4>
        <p>{movie.overview}</p>
      </div>
    );
  };
  return (
    <div className='both' >
      <div>
        <br></br>
        <button onClick={toggleDropdown}>Toggle Dropdown</button>
        {isOpen && (
          <ul className="movie-list" >
            {movies.map(movie => (
              <li className="movie" key={movie.id} style={{ listStyle: 'none' }}>
                <Movie movie={movie} />
                <button onClick={() => addToFavorites(movie)}>Add to Favorites</button>
              </li>
              
            ))}
          </ul>
        )}
      </div>
      
      <div>
        <FavoriteList fMovies={favoriteMovies} />
      </div>
    </div>
  );
  
};

export default MovieList;
