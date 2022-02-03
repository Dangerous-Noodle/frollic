import * as types from '../constants/actionTypes';
import axios from 'axios';

export const getResults = (location, radius, categories) => (dispatch) => {
  
  
  axios({
    method: 'POST',
    url: `/api/search`,
    headers: { 'Content-Type': 'application/JSON' },
    data: {
      location: location,
      radius: radius,
      categories: categories,
    }
  })
  .then((response) => {
    dispatch({
      type: types.GET_RESULTS,
      payload: response.data,
    });
  });
};

export const addFav = (favorite) => ({
  type: types.ADD_FAV,
  payload: favorite,
});

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
    dispatch({
      type: types.USER_LOGIN,
      // determine response from backend using status code
      payload: response.data,
    });
  });
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