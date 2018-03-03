const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

// creating Express app
const app = express();

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.use(flash());

app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  next();
});

// routing middleware
app.use('/', routes);


// exporting
module.exports = app;

