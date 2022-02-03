import * as types from '../constants/actionTypes';

const initialState = {
  searchResults: [],
  favorites: [],
  savedResults: [],
  favsPageOn: false,
  firstRender: true,
  comments: [],
  username: '',
  password: '',
  loggedIn: false,
  loginState: true,
  signupState: false,
  usernameExists: false,
};

const mainReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.GET_RESULTS:

    return {
        ...state,
        firstRender: false,
        searchResults: action.payload,
      }
    case types.ADD_FAV:
      // doing a deep copy using the slice method
      const newFavs = state.favorites.slice();

      if (!state.favorites.includes(action.payload)) newFavs.push(action.payload);
      
      return {
        ...state,
        favorites: newFavs,
      }
    case types.TOGGLE_FAVS_PAGE:
      if (!state.favsPageOn) {

        return {
          ...state,
          savedResults: state.searchResults,
          searchResults: state.favorites,
          favsPageOn: true,
        }
      }
      return {
        ...state,
        searchResults: state.savedResults,
        saveResults: [],
        favsPageOn: false,
      }
    case types.ADD_COMMENT:
      const newComments = state.comments.slice();
      newComments.push(action.payload);

      return {
        ...state,
        comments: state.newComments,
      }
    case types.TOGGLE_COMMENTS:
      return {
        ...state,
      }
    case types.TOGGLE_LOGIN:
      if (!state.loginState) {
      return {
        ...state,
        loginState: true,
      }
    }
      return {
        ...state,
        loginState: false,
      }

    case types.VALIDATE_USERNAME:
      // Assuming response object from POST request is in the form of {userExists: true}
      console.log('USERNAME EXISTS:', action.payload)
      return {
        ...state,
        usernameExists: action.payload,
      }
    case types.USER_LOGIN:
      // Assuming response object from POST request is in the form of {userExists: true}
      console.log('USER HAS LOGGED ON: ', action.payload)
      return {
        ...state,
        usernameExists: action.payload,
      }
      default:
      return state;
  }
};

export default mainReducer;
