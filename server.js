// requiring
const express = require('express');
const mongoose = require('mongoose');
const app = require('./app');

// ports && stuff

// environmental variables
require('dotenv').config({path: 'variables.env'});
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.log(`Не удалось подключиться к базе данных! \n ${err}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порте ${port}!`);
})

