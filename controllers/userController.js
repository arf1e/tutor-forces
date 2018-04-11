const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.getLoginForm = (req, res) => {
  if (req.user) {
    console.log(req.user.role);
    res.redirect('/');
  } else {
  res.render('login');
  }
}

exports.getRegisterForm = (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('register');
  }
}

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('firstName');
  req.checkBody('firstName', 'You must supply your first name!').notEmpty();
  req.sanitizeBody('lastName');
  req.checkBody('lastName', 'You must supply your last name!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password cannot be blank!').notEmpty();
  req.checkBody('confirm-password', 'Confirm your password!').notEmpty();
  req.checkBody('confirm-password', 'Oops! Your passwords do not match!').equals(req.body.password);
  req.checkBody('role').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', { body: req.body, flashes: req.flash() });
    return;
  }
  next();
};

exports.createUser = async (req, res, next) => {
  const user = new User({email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, role: req.body.role });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  // dat boi gonna hash password |^
  next();
}

