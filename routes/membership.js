const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');

router.get('/', membershipController.membership_get);

router.post('/', membershipController.membership_post);

module.exports = router;
