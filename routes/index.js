const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(eventsController.landingPage));
router.get('/events', catchErrors(eventsController.getEvents));
router.get('/events/add', eventsController.addEvent);
router.post('/events/add', catchErrors(eventsController.createEvent));
router.get('/events/:id/edit', catchErrors(eventsController.editEvent));
router.post('/events/add/:id', catchErrors(eventsController.updateEvent));
module.exports = router;