const { body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.membership_get = (req, res, next) => {
  res.render('membership-form', {
    title: 'Become a Member',
  });
};

exports.membership_post = [
  body('email')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Email must be specified')
    .isEmail()
    .withMessage('Input must be an email address.'),
  body('secret_password', 'Wrong Password').equals(process.env.SECRET_PASS),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('membership-form', {
        title: 'Become a Member',
        errors: errors.array(),
      });

      return;
    }

    try {
      if (req.body.secret_password === process.env.SECRET_PASS) {
        const user = await User.findOneAndUpdate(
          { email: req.body.email },
          { membership_status: 'member' }
        );

        res.redirect('/');
      }
    } catch (e) {
      return next(e);
    }
  },
];
