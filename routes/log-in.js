const express = require('express');
const router = express.Router();
const passport = require('passport');
const logInController = require('../controllers/logInController');

router.get('/', logInController.log_in_get);

router.post('/', logInController.log_in_post);

module.exports = router;
