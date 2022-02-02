const express = require('express');
const controller = require('../controllers/controller.js');
const { signupUser, loginUser, logoutUser, createSession, validateUsername } = require('../middleware/authMiddleware.js');
const authRouter = express.Router();


// auth route will go here

authRouter.get('/validateusername/:username', validateUsername, (req, res) => {
  res.status(200).send(`Username ${req.params.username} found!`);
});

authRouter.post('/login', loginUser, createSession, (req, res) => {
  res.status(200).send('Login success!');
});

authRouter.post('/logout', logoutUser, (req, res) => {
  res.status(200).send('Logged out!');
});

authRouter.post('/signup', signupUser, createSession, (req, res) => {
  return res.status(200).send('Signup success!');
});

module.exports = authRouter;
