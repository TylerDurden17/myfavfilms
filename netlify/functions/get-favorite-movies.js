exports.handler = async (event, context) => {
    const faunadb = require('faunadb');
    const REACT_APP_fauna_secret = process.env.REACT_APP_fauna_secret;
    const client = new faunadb.Client({
        secret: `${REACT_APP_fauna_secret}`
    });
    const q = faunadb.query;

    // Retrieve all the movie lists
    const movieLists = await client.query(
        q.Map(
        q.Paginate(q.Match(q.Index('all_user_lists'))),
        q.Lambda('x', q.Get(q.Var('x')))
        )
    );

    return {
        statusCode: 200,
        body: JSON.stringify(movieLists.data)
    };
};