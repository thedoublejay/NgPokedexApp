var express = require('express');
var path = require('path');
var pokemons = require('./pokemonsController');
var app = express();
var rootPath = path.normalize(__dirname + '/../');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 8000));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static( rootPath + '/app'));

app.get('/data/:fname', pokemons.get);


app.get('*', function(req, res) { res.sendFile(rootPath + '/app/index.html'); });

app.listen(app.get('port'), function() {
  console.log('The server for NgPokedexApp is now running. You may view it by typing localhost:8000 in your browser.');
});
