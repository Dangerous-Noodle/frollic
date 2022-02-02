const express = require('express');
const controller = require('../controllers/controller.js');
const authRouter = express.Router();


// auth route will go here
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