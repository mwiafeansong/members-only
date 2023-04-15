const express = require('express');
const router = express.Router();
const deleteMsgController = require('../controllers/deleteMsgController');

router.get('/:id', deleteMsgController.delete_message_get);

router.post('/:id', deleteMsgController.delete_message_post);

module.exports = router;
