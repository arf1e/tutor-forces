const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

// creating Express app
const app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// public files
app.use(express.static(__dirname + '/public'));

// routing middleware
app.use('/', routes);


// exporting
module.exports = app;

