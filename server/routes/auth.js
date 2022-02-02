const express = require('express');
const controller = require('../controllers/controller.js');
const authRouter = express.Router();


// auth route will go here
router.post('/', (req, res) => {
  console.log('hello');
  res.status(200).send('hello there!');
});

module.exports = authRouter;