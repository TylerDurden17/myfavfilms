// functions/add-favorite-movie.js

//import faunadb from 'faunadb';
exports.handler = async (event, context) => {
  const faunadb = require('faunadb');
  const REACT_APP_fauna_secret = process.env.REACT_APP_fauna_secret;
  const client = new faunadb.Client({
    secret: `${REACT_APP_fauna_secret}`
  });
  const data = JSON.parse(event.body);
  const response = await client.query(
    faunadb.query.Create(faunadb.query.Collection('favorite_movies_of_all_time'), {
      data,
    }),
  )
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};