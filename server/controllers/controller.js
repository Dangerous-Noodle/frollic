const axios = require('axios');
const { YELP_KEY } = require('../secrets/secrets');

const controller = {};

controller.getResults = (req, res, next) => {

  const radius = Math.round((req.body.radius || 5) * 1600);
  const location = req.body.location || 10109;
  const categories = req.body.categories || [];
  const attributes = req.body.attributes || 'wheelchair_accessible';

  axios({
    method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    params: {
      'attributes': attributes,
      'radius': radius,
      'location': location,
      'categories': categories,
    },
    headers: { 'Authorization' : YELP_KEY },
  })
  .then(response => {
    const data = response.data.businesses.map(business => {
      return {
        businessID : business.id,
        name : business.name,
        alias: business.alias,
        image : business.image_url,
        url : business.url,
        reviews: business.review_count,
        address : `${business.location.address1}, ${business.location.city}, ${business.location.state} ${business.location.zip_code}`,
        phone : `(${business.phone.slice(2, 5)}) ${business.phone.slice(5, 8)}-${business.phone.slice(8)}`,
        rating : business.rating,
        price : business.price,
        coordinates: business.coordinates,
        distance :`${Math.round(business.distance / 1000 / 1.6 * 100) / 100} mi`
      };
    });
    res.locals.searchResults = data;
    return next();
  })
  .catch(err => next({
    log: `controller.getResults: ERROR: ${err}`,
    message: { err: 'Error occurred in controller.getResults. Check server logs for more details.' },
  }));
};

// const test = false;
// const fakeRes = {locals: {}};
// const fakeNext = () => console.log(fakeRes.locals.userFavorites[0]);
controller.getBusinessInfo = (req, res, next) => {
  let favorites;
  favorites = res.locals.userFavorites;
  favorites = favorites.map(el => 
    axios({
      method: 'GET',
      url: `https://api.yelp.com/v3/businesses/${el.places_id}`,
      headers: { 'Authorization' : YELP_KEY },
    })
    .then(response => {
      console.log('response is', response);
      const { id, name, alias, image_url, url, review_count, location, phone, rating, price, coordinates, distance } = response.data;
      return {
        businessID : id,
        name : name,
        alias: alias,
        image : image_url,
        url : url,
        reviews: review_count,
        address : `${location.address1}, ${location.city}, ${location.state} ${location.zip_code}`,
        phone : `(${phone.slice(2, 5)}) ${phone.slice(5, 8)}-${phone.slice(8)}`,
        rating : rating,
        price : price,
        coordinates: coordinates,
        distance :`N/A`
      };
    })
    .catch(err => null)
  );
  Promise.all(favorites)
    .then(result => {
      res.locals.userFavorites = result;
      return next();
    })
    .catch(err => next({
      log: `controller.getBusinessInfo: ERROR: ${err}`,
      message: { err: 'Error occurred in controller.getBusinessInfo. Check server logs for more details.' },
    }));
}

//console.log(controller.getBusinessInfo(fakeRes, fakeRes, fakeNext));

module.exports = controller;
