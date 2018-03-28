const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator');
const md5 = require('md5');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email Address!'],
    required: 'Please supply an email address!'
  },
  firstName: {
    type: String,
    required: 'Introduce yourself please!',
    trim: true
  },
  lastName: {
    type: String,
    required: 'Introduce yourself please!',
    trim: true
  }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);