import React, { useState, useEffect } from 'react';

const FavoriteList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/.netlify/functions/get-favorite-movies');
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setMovies(data);
        }
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
      //
      //<li key={movie.filmName}>{movie.filmName} ({movie.year})</li>
      //
    };

    fetchMovies();
  }, []);

  return (
    <div> {movies.map(movieList => (
      <div className='theList' key={movieList.ref['@ref'].id}>
        <h2>{movieList.data.email.replace(/@gmail\.com$/, '')}</h2>
        <ol>
          {movieList.data.favorite_movies_of_all_time.map(movie => (
            <li key={movie.filmName}>{movie.filmName} ({movie.year})</li>
          ))}
        </ol>
      </div>
    ))}
    </div>
  );
};

export default FavoriteList;
