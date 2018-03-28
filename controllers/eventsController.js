const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const multer = require('multer');
const multerOptions = {
  // Где файл будет храниться?
  storage: multer.memoryStorage(),
  /* |^ Нужно сохранить загруженный оригинал 
  ненадолго в памяти, после чего он будет сжат 
  и сохранен уже на диск */

  // Какие файлы вообще принимать?
  fileFilter(req, file, next) {
    // Проверяем по маймтайпу:
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
    // Если все гуд, переходим к следующему обработчику:
      next(null, true);
    } else {
      next({ message: 'That file is not allowed!' }, false);
    }
  }
  // https://github.com/expressjs/multer
};

const jimp = require('jimp');
const uuid = require('uuid');

exports.landingPage = (req, res) => {
  res.render('landing', {'pageName': 'Home'});
}

exports.homePage = (req, res) => {
  res.render('events', {'pageName': 'Events'});
}

exports.addEvent = (req, res) => {
  res.render('editEvent', {'pageName': 'Edit Event'});
}

// Загоняем фото в память с помощью multer
exports.upload = multer(multerOptions).single('photo');
// Ресайз
exports.resize = async (req, res, next) => {
  // req.file существует только тогда, когда используется метод "single" на мультере
  // если нужно больше фотографий, надо будет писать новый обработчик
  if(!req.file) {
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();
}

exports.createEvent = async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  req.flash('success', 'Created new event');
  res.redirect('/events/');
}

exports.getEvents = async(req, res) => {
  const events = await Event.find();
  res.render('events', {'pageName': 'Events', events});
}

exports.editEvent = async(req, res) => {
  const event = await Event.findOne({_id: req.params.id});
  res.render('editEvent', {'pageName': `Edit ${event.name}`, event});
}

exports.updateEvent = async(req, res) => {
  const event = await Event.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
    runValidators: true
  }).exec();
  res.redirect('/events');
}

exports.renderEvent = async(req, res) => {
  const event = await Event.findOne({slug: req.params.slug});
  if (!event) return next();
  res.render('eventPage', {event});
}  