const express = require('express');
const router = express.Router();
const userController = require('./controller');

router.use('/register', userController.validateCaptchaResponse);

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
