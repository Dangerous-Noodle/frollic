const db = require('../models/dbModel');
const { createResponse } = require('../models/responseModel');

const userController = {};

userController.addFavorite = (req, res, next) => {
  let userId, businessId;

  if (!res.locals.authInfo || !res.locals.authInfo.authenticated) {
    return res.status(400).json(createResponse(false, 400, 'You must be logged in to store favorites'));
  } else {
    userId = res.locals.authInfo.user_id;
  }
  if (req.body.businessId) {
    businessId = req.body.businessId;
  } else {
    return res.status(400).json(createResponse(false, 400, 'You must specify a business id'));
  }
  
  const queryString = 'INSERT INTO favorites (user_id, places_id) VALUES ($1, $2);';
  const queryParams = [userId, businessId];
  console.log(queryParams);

  db.query(queryString, queryParams)
  .then(result => {
    return next();
  }) 
  .catch(err => next(err));

}

userController.getFavorites = (req, res, next) => {

  console.log('inside usercontroller get favorites')

  if (!res.locals.authInfo || !res.locals.authInfo.authenticated) {
    return res.status(400).json(createResponse(false, 400, 'You must be logged in to view favorites'));
  } else {
    userId = res.locals.authInfo.user_id;
  }

  const queryString = 'SELECT places_id FROM favorites WHERE user_id = $1;';
  const queryParams = [userId];

  db.query(queryString, queryParams)
  .then(result => {
    res.locals.userFavorites = result.rows;
    return next();
  }) 
  .catch(err => next(err));

}








module.exports = userController;