const Message = require('../models/message');

exports.delete_message_get = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id).populate('user');

    res.render('message-delete', {
      title: 'Delete Message',
      message,
    });
  } catch (err) {
    return next(err);
  }
};

exports.delete_message_post = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndRemove(req.body.messageid);
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};
