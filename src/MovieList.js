import React, { useState } from 'react';
import FavoriteList from './FavoriteList';

const MovieList = props => {
  // component code goes here

  const [isOpen, setIsOpen] = useState(true);
  const { movies } = props;
  const [ favoriteMovies, setFavoriteMovies ] = useState([])
  
  const addToFavorites = movie => {

    const existingMovie = favoriteMovies.find((m) => m.id === movie.id);
    // Add movie to the list if it does not exist
    if (!existingMovie) setFavoriteMovies([...favoriteMovies, movie]);
    
    // fetch('/.netlify/functions/add-favorite-movie', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     id: 0,
    //     username: "Kartikey Rai",
    //     movie: `${JSON.stringify(movie.title) + " " + JSON.stringify(movie.release_date.replace(/^(\d{4})-\d{2}-\d{2}$/, '$1'))}`
    //   }),
    //   }).then(response => {
    //     console.log(response);
    //   });
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
        <p>{movie.release_date.replace(/^(\d{4})-\d{2}-\d{2}$/, '$1')}</p>
      </div>
    );
  };

  return (
    <div className='both' >
      <div>
        <br></br>
        <button onClick={toggleDropdown}>Toggle Dropdown</button>
        {isOpen && (
          <div className="movie-list" >
            {movies.map(movie => (
              <div className="movie" key={movie.id}>
                <Movie movie={movie} />
                <button id="addToFavoritesButton" onClick={() => addToFavorites(movie) } >Add to Favorites</button>
              </div>
              
            ))}
          </div>
        )}
      </div>
      
      <div>
        <FavoriteList fMovies={favoriteMovies} />
      </div>
    </div>
  );
  
};

export default MovieList;