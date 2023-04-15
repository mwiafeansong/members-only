const express = require('express');
const router = express.Router();
const signUpController = require('../controllers/signUpController');

router.get('/', signUpController.sign_up_get);

router.post('/', signUpController.sign_up_post);

module.exports = router;
