const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
const utils = require('../utils');

exports.sign_up_get = (req, res, next) => {
  res.render('sign-up-form', {
    title: 'Sign Up',
  });
};

exports.sign_up_post = [
  body('first_name', 'First name must be specified.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('last_name', 'Last name must be specified.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('email')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Input should be an email address.'),
  body('password', 'Password should be at least 8 characters long.')
    .trim()
    .isLength({ min: 8 })
    .escape(),
  body(
    'confirm_password',
    'Confirm Password field must have the same value as the password field.'
  )
    .exists()
    .custom((value, { req }) => value === req.body.password),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('sign-up-form', {
        title: 'Sign Up',
        errors: errors.array(),
      });

      return;
    }

    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) return next(err);

        const user = new User({
          first_name: utils.capitalizeWords(req.body.first_name),
          last_name: utils.capitalizeWords(req.body.last_name),
          email: req.body.email,
          password: hashedPassword,
        });

        if (req.body.is_admin === process.env.ADMIN_SECRET_PASS) {
          user.is_admin = true;
          user.membership_status = 'member';
        } else {
          user.is_admin = false;
          user.membership_status = 'non-member';
        }

        const result = await user.save();

        if (user.is_admin) {
          res.redirect('/log-in');
        } else {
          res.redirect('/membership');
        }
      });
    } catch (err) {
      return next(err);
    }
  },
];
