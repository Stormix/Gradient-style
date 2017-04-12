/**
 * Module dependencies.
 */
var phantom = require('phantom');
var cheerio = require('cheerio');
var express = require('express'),
    docController = require('./controllers/docController'),
    app = express(),
    port = process.env.PORT || 9000;
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');
// Start controllers
docController(app,cheerio,phantom);
app.listen(port, function(error) {
    console.log('Running server on port -> ' + port);
});
