const axios = require('axios');
const YELP_KEY = 'Bearer kDH3a4z30wEffzgX0iyn8OTTyqvuVU4zUw9vPFzfFi9p8pFJxtEeyWyoDH1hYi2jpNNUnYmhrtu1OrwI1Q_mOMZwQbTY95bKtm8IN-xynKO82AHLjd_CS2fjfdr5YXYx';

const controller = {};

controller.getResults = (req, res, next) => {

  const radius = Math.round((req.body.radius || 5) * 1600);
  const location = req.body.location || 10109;
  const categories = req.body.categories || [];

  axios({
    method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    params: {
      'attributes' : 'wheelchair_accessible',
      'radius': radius,
      'location': location,
      'categories': categories,
    },
    headers: { 'Authorization' : YELP_KEY },
  })
  .then(response => {
    const data = response.data.businesses.map(business => {
      return {
        name : business.name,
        image : business.image_url,
        url : business.url,
        address : `${business.location.address1}, ${business.location.city}, ${business.location.state} ${business.location.zip_code}`,
        phone : `(${business.phone.slice(2, 5)}) ${business.phone.slice(5, 8)}-${business.phone.slice(8)}`,
        rating : business.rating,
        price : business.price,
        distance :`${Math.round(business.distance * .00062137 * 100) / 100} mi`
      };
    });
    res.locals.searchResults = data;
    return next();

  })
  .catch(err => next(err));
}


module.exports = controller;