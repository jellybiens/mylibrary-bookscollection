const express = require( 'express' );
const path = require( 'path' );

const cors = require( 'cors' );
const graphqlHTTP = require( 'express-graphql' );
const schema = require( './schema' );

// config
const APP_PORT = process.env.PORT || 3000;
const app = express();

app.use( cors() );

app.use( '/graphql', graphqlHTTP( {
  schema: schema,
  pretty: true,
  graphiql: true,

} ) );

// the __dirname is the current directory from where the script is running
app.use( express.static( __dirname + '/public/' ) );

// send the user to index html page inspite of the url
app.get( '*', ( req, res ) => {
  res.sendFile( path.resolve( __dirname + '/public/', 'index.html' ) );
} );


app.listen( APP_PORT, ()=>{
  console.log( `App listening on port ${APP_PORT}` );
} );
