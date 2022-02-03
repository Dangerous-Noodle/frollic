import * as types from '../constants/actionTypes';
import axios from 'axios';

export const getResults = (location, radius, categories, attributes) => (dispatch) => {
  
  axios({
    method: 'POST',
    url: `/api/search`,
    headers: { 'Content-Type': 'application/JSON' },
    data: {
      location: location,
      radius: radius,
      categories: categories,
      attributes: attributes,
    }
  })
  .then((response) => {
      console.log(response.data)
    dispatch({
      type: types.GET_RESULTS,
      payload: response.data,
    });
  });
};

export const addFav = (businessID) => (dispatch) => {
  // modify to send favorite request to database
  console.log('ADDING TO FAVORITES, BUSINESS ID: ', businessID)
  axios({
    method: 'POST',
    // sync endpoint with backend
    url: `/api/addfavorite`,
    headers: { 'Content-Type': 'application/JSON' },
    // what type of data to send
    data: {businessId: businessID}
  })
  .then((response) => {
    console.log('ADDED TO FAVORITES:', response.data)
    dispatch({
      type: types.ADD_FAV,
      payload: response.data,
    });
  });
};

export const getFav = () => (dispatch) => {
  // modify to send favorite request to database
  console.log('RETRIEVING FAVORITES')
  axios({
    method: 'GET',
    // sync endpoint with backend
    url: `/api/getfavorites`,
    headers: { 'Content-Type': 'application/JSON' },
  })
  .then((response) => {
    console.log('RETRIEVING FAVORITES:', response.data)
    dispatch({
      type: types.GET_FAV,
      payload: response.data,
    });
  });
};

export const toggleFavsPage = () => ({
  type: types.TOGGLE_FAVS_PAGE,
});

export const addComment = (number, comment) => ({
  type: types.ADD_COMMENT,
  payload: { number, comment }
});

export const toggleComments = () => ({
  type: types.TOGGLE_COMMENTS,
});

export const toggleLogin = () => ({
  type: types.TOGGLE_LOGIN,
});

export const toggleAuth = () => ({
  type: types.TOGGLE_AUTH,
});

export const validateUsername = (username) => (dispatch) => {
  
  axios({
    method: 'GET',
    url: `/auth/validateusername/${username}`,
    headers: { 'Content-Type': 'application/JSON' },
    // params: {
    //   username: username,
    // }
  })
  .then((response) => { 
    dispatch({
      type: types.VALIDATE_USERNAME,
      // {username: req.params.username, found: true/false }
      payload: response.data.found,
    });
  });
};

export const userLogin = (username, password) => (dispatch) => {
  
  axios({
    method: 'POST',
    url: `/auth/login`,
    headers: { 'Content-Type': 'application/JSON' },
    data: {auth:
      {
      username: username,
      password: password
      }
    }
  })
  .then((response) => {
    console.log('LOGIN RESPONSE:', response.data)
    dispatch({
      type: types.USER_LOGIN,
      // determine response from backend using status code
      payload: response.data,
    });
  });
};

export const userLogout = () => (dispatch) => {
  axios({
    method:'POST',
    url: `/auth/logout`,
    headers: { 'Content-Type': 'application/JSON' },
    data: {}
  })
  .then((response) => {
    dispatch({
      type: types.USER_LOGOUT,
      payload: response.data
    })
  })
};

export const userSignup = (username, password) => (dispatch) => {
  
  axios({
    method: 'POST',
    url: `/auth/signup`,
    headers: { 'Content-Type': 'application/JSON' },
    data: {auth:
      {
      username: username,
      password: password
      }
    }
  })
  .then((response) => {
    dispatch({
      type: types.USER_SIGNUP,
      // determine response from backend using status code
      payload: response.data,
    });
  });
};