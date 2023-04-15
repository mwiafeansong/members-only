const express = require('express');
const router = express.Router();
const newMessageController = require('../controllers/newMessageController');

router.get('/', newMessageController.new_message_get);

router.post('/', newMessageController.new_message_post);

module.exports = router;
