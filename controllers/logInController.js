const { body, validationResult } = require('express-validator');
const passport = require('passport');
const User = require('../models/user');

exports.log_in_get = (req, res, next) => {
  res.render('log-in-form', {
    title: 'Log In',
  });
};

exports.log_in_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sign-up',
});
