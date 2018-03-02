const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const tl = require('transliteration');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  location: String,
  description: String,
  slug: String
});

eventSchema.pre('save', function(next){
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = tl.slugify(this.name);
  next();
})

module.exports = mongoose.model('Event', eventSchema);