const { body, validationResult } = require('express-validator');
const Message = require('../models/message');
const utils = require('../utils');

exports.new_message_get = (req, res, next) => {
  res.render('new-message-form', {
    title: 'New Message',
  });
};

exports.new_message_post = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Title must be specified')
    .isLength({ max: 100 })
    .withMessage('Title must not exceed 100 characters.'),
  body('message', 'Message must be between  1 and 200 characters long')
    .trim()
    .isLength({ min: 1, max: 300 }),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('new-message-form', {
        title: 'New Message',
        errors: errors.array(),
      });
      return;
    }

    try {
      const newMessage = new Message({
        user: req.user,
        title: req.body.title,
        text: req.body.message,
      });

      const msg = await newMessage.save();
      res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },
];
