const express = require('express');
const controller = require('../controllers/controller.js');
const { createResponse } = require('../models/responseModel');
const { signupUser, loginUser, logoutUser, createSession, validateUsername } = require('../middleware/authMiddleware.js');
const authRouter = express.Router();


authRouter.get('/validateusername/:username', validateUsername, (req, res) => {
  return res.status(200).json(createResponse(true, 200, 'Username found'));
});

authRouter.post('/login', loginUser, createSession, (req, res) => {
  return res.status(200).json(createResponse(true, 200, 'Login successful'));
});

authRouter.post('/logout', logoutUser, (req, res) => {
  return res.status(200).json(createResponse(true, 200, 'Logout successful'));
});

authRouter.post('/signup', signupUser, createSession, (req, res) => {
  return res.status(200).json(createResponse(true, 200, 'Signup successful'));
});

module.exports = authRouter;
