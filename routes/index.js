var express = require('express');
var router = express.Router();
const Message = require('../models/message');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.find().populate('user');

    res.render('index', {
      title: 'Members Only',
      user: req.user,
      messages: messages,
    });
  } catch (err) {
    return next(err);
  }

  //res.render('index', { title: 'The Club', user: req.user });
});

module.exports = router;
