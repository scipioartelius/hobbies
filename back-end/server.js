// Uncomment for local environment or start the server using "heroku local"
// require('dotenv').config();

require('./config/db');
require('./config/passport');

const allowCORS = require('./config/cors');
const passport = require('passport');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./users/router');
const itemsRouterFactory = require('./items/router');
const booksRouter = itemsRouterFactory('Book');
const moviesRouter = itemsRouterFactory('Movie');
const server = express();

server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }));

if(process.env.ALLOW_CORS === 'yes') {
    allowCORS(server);
}

server.use(passport.initialize());

server.use('/api/users', usersRouter);
server.use('/api/books', booksRouter);
server.use('/api/movies', moviesRouter);

server.route('/*').get(function(req, res) {
    return res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(process.env.PORT || 3000);
