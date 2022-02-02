const express = require('express');
const controller = require('../controllers/controller.js');
const authRouter = express.Router();


// auth route will go here

router.get('/validateusername', (req, res) => {
  console.log('hello');
  res.status(200).send('the username might be available, idk!');
});

router.post('/login', (req, res) => {
  console.log('hello');
  res.status(200).send('hello there!');
});

router.post('/logout', (req, res) => {
  console.log('hello');
  res.status(200).send('hello there!');
});

router.post('/signup', (req, res) => {
  console.log('hello');
  res.status(200).send('hello there!');
});

module.exports = authRouter;