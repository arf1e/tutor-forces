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
  location: {
    type: {
      type: String,
      default: 'Point'
    }, 
    coordinates: [{
      type: Number,
      required: 'Provide coordinates of the event please'
    }],
    address: {
      type: String,
      required: 'Supply an address please'
    }
  },
  description: String,
  slug: String,
  photo: String
});

eventSchema.pre('save', async function(next){
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = tl.slugify(this.name);
  //=== Если ивенты создаются с одинаковым именем 
  
  // 1. Создаём паттерн для поиска таких ивентов: 
  const slugRegExp = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');

  // 2. Ищем ивенты, совпадающие по паттерну (через this.constructor, так как здесь еще нет схемы Event)
  const eventsWithSlug = await this.constructor.find({ slug: slugRegExp });

  // 3. Если таковые нашлись, создаём уникальный слаг для нового ивента:
  if(eventsWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
  }

  next();
})

module.exports = mongoose.model('Event', eventSchema);