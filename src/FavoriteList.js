import React from 'react';
/*Add a check to the FavoriteList component to make sure 
that the fMovies prop is defined before trying to map over it*/
const FavoriteList = props => {
  const { fMovies } = props;
  if (fMovies) {
    return (
      <div>
        <h3>Favorite List:</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ul className="favorite-list">
          {fMovies.map(movie => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
      </div>
      
    );
  }
  return null;
};


export default FavoriteList;
