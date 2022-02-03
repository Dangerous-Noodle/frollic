const express = require('express');
const controller = require('../controllers/controller.js');
const { signupUser, loginUser, logoutUser, createSession, validateUsername } = require('../middleware/authMiddleware.js');
const authRouter = express.Router();


// auth route will go here

authRouter.get('/validateusername/:username', validateUsername, (req, res) => {
  res.json({username: req.params.username, found: true });
});

authRouter.post('/login', loginUser, createSession, (req, res) => {
  res.json('Login success!');
});

authRouter.post('/logout', logoutUser, (req, res) => {
  res.json('Logged out!');
});

authRouter.post('/signup', signupUser, createSession, (req, res) => {
  res.json('Signup success!');
});

module.exports = authRouter;
