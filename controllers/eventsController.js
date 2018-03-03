const mongoose = require('mongoose');
const Event = mongoose.model('Event');

exports.landingPage = (req, res) => {
  res.render('landing', {'pageName': 'Home'});
}

exports.homePage = (req, res) => {
  res.render('events', {'pageName': 'Events'});
}

exports.addEvent = (req, res) => {
  res.render('editEvent', {'pageName': 'Edit Event'});
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