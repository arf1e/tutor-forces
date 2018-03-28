const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const expressValidator = require('express-validator');
const errorHandlers = require('./handlers/errorHandlers');
const passport = require('passport');
require('./handlers/passport');

// creating Express app
const app = express();

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressValidator());

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// public files
app.use(express.static(__dirname + '/public'));

// Флеш-сообщения
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false
}));

// passport js
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  next();
});

// routing middleware
app.use('/', routes);

// 404
app.use(errorHandlers.notFound);


// exporting
module.exports = app;

