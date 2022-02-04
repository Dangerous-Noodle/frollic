const express = require('express');
const controller = require('../controllers/controller.js');
const userController = require('../controllers/userController.js');
const { createResponse } = require('../models/responseModel');
const router = express.Router();


router.post('/search', controller.getResults, (req, res) => {
  res.status(200).json(res.locals.searchResults);
});

router.get('/getfavorites', userController.getFavorites, controller.getBusinessInfo, (req, res) => {
  return res.status(200).json(createResponse(true, 200, 'Favorites found', res.locals.userFavorites));
});

router.post('/addfavorite', userController.addFavorite, (req, res) => {
  return res.status(200).json(createResponse(true, 200, 'Added to favorites'));
});

module.exports = router;
