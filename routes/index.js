const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.get('/', eventsController.landingPage);
router.get('/events', eventsController.homePage);
router.get('/events/add', eventsController.addEvent);
router.post('/events/add', eventsController.createEvent);

module.exports = router;