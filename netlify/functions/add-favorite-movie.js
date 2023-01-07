// functions/add-favorite-movie.js

//import faunadb from 'faunadb';
exports.handler = async (event, context) => {
  const faunadb = require('faunadb');
  const REACT_APP_fauna_secret = process.env.REACT_APP_fauna_secret;
  const client = new faunadb.Client({
    secret: `${REACT_APP_fauna_secret}`
  });
  const q = faunadb.query;
  const  data  = JSON.parse(event.body);
  const userId = data.userId.uid;
  const email = data.userId.email;
  const filmName = `${data.filmName}`;
  const year = `${data.year}`;

  try {
    // Check if a list for this user already exists
    const userList = await client.query(
      q.Get(
        q.Match(
          q.Index('user_lists_by_user_id'),
          userId
        )
      )
    );

    // If the list already exists, update it with the new movie
    const updatedList = await client.query(
      q.Update(
        userList.ref,
        { data: { favorite_movies_of_all_time: q.Append(q.Select('favorite_movies_of_all_time', userList.data), [{ filmName, year }]) } }
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify(updatedList),
    };
  } catch (error) {
    // If the list does not exist, create a new one with the movie
    const newList = await client.query(
      q.Create(
        q.Collection('user_lists'),
        { data: { user_id: userId, email: email, favorite_movies_of_all_time: [{ filmName, year }] } }
      )
      
    );

    return {
      statusCode: 200,
      body: JSON.stringify(newList),
    };
  }
};  