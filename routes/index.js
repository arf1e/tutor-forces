const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const { catchErrors } = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/', eventsController.landingPage);

router.get('/events', catchErrors(eventsController.getEvents));

router.get('/events/add', eventsController.addEvent);

router.post('/events/add', 
  eventsController.upload, 
  eventsController.resize,
  catchErrors(eventsController.createEvent));

router.get('/events/:id/edit', catchErrors(eventsController.editEvent));

router.post('/events/add/:id',
  eventsController.upload,
  eventsController.resize,
  catchErrors(eventsController.updateEvent));

router.get('/events/:slug', eventsController.renderEvent);

router.get('/login', userController.getLoginForm);
router.post('/login', authController.login);
router.get('/register', userController.getRegisterForm);
router.post('/register', userController.validateRegister, userController.createUser, authController.login);
router.get('/logout', authController.logout);


module.exports = router;