const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);
router.delete('/logout', AuthController.logout);

module.exports = router;