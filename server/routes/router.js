const express = require('express');
const controller = require('../controllers/controller.js');
const { createResponse } = require('../models/responseModel');
const router = express.Router();


router.post('/search', controller.getResults, (req, res) => {
  res.status(200).json(res.locals.searchResults);
});

module.exports = router;
