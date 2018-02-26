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
  res.redirect(`/events/${event.slug}`);
}

exports.getEvents = async(req, res) => {
  const events = await Event.find();
  console.log(events);
  res.render('events', {'pageName': 'Events', events});
}
