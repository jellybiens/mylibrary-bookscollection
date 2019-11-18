const express = require( 'express' );
const path = require( 'path' );

const cors = require( 'cors' );
// require('dotenv').config();

// config
const APP_PORT = process.env.PORT || 3000;
const app = express();

app.use( cors() );

// the __dirname is the current directory from where the script is running
app.use( express.static( __dirname + '/public/' ) );

// send the user to index html page inspite of the url
app.get( '*', ( req, res ) => {
  res.sendFile( path.resolve( __dirname + '/public/', 'index.html' ) );
} );


app.listen( APP_PORT, ()=>{
  console.log( `App listening on port ${APP_PORT}` );
} );
