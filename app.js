require('dotenv').config()

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const SpotifyWebApi = require('spotify-web-api-node')
// require spotify-web-api-node package here:


const app = express()

app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  })
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error))
// Our routes go here:
spotifyApi
app.get('/Homepage', (req, res, next) => {
    res.render('Homepage');
  })
  
  app.get('/artist-search-result', (req, res, next) => {
    spotifyApi.getArtist('2hazSY4Ef3aB9ATXW7F5w3')
  .then((data) => {
    console.log('Artist information', data.body);
  }) .catch((err) => {
    console.log("The error while searching artists occurred: ", err)
  });
    res.render('ArtistSearchResult');
})
     
  
  app.get('/albums/:artistId', (req, res, next) => {
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
    .then((data)=> {
    console.log('Artist albums', data.body);
    
  })
  .catch((err=>{
    console.error(err);
  }
));
   res.render('albums');
  })
  

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'))
