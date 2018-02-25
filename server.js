// requiring
const mongoose = require('mongoose');


// environmental variables
require('dotenv').config({path: 'variables.env'});
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.log(`Не удалось подключиться к базе данных! \n ${err}`);
});

require('./models/Event');
const app = require('./app');
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порте ${port}!`);
})

