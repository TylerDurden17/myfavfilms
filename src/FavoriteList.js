import React from 'react';
/*Add a check to the FavoriteList component to make sure 
that the fMovies prop is defined before trying to map over it*/
const FavoriteList = props => {
  const { fMovies } = props;
  if (fMovies) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ul>
        {fMovies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
      </div>
    );
  }
  return null;
};


export default FavoriteList;
