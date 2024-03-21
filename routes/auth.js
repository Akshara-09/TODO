const express = require("express");
const authController = require('../controllers/authController');

const authRoutes = express.Router();

authRoutes.post('/signup', authController.signup);
authRoutes.post('/login', authController.login);
authRoutes.post('/forgot-password', authController.forgotPassword);
authRoutes.post('/reset-password', authController.resetPassword);

module.exports = authRoutes;
