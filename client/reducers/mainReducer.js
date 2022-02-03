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
  authState: true,
  loginState: true,
  signupState: false,
  usernameExists: false,
  signupError: '',
  loginError: '',
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
    case types.GET_FAV:
      return {
        ...state,
        favorites: action.payload,
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
      case types.TOGGLE_AUTH:
        if (!state.authState) {
        return {
          ...state,
          authState: true,
        }
      }
        return {
          ...state,
          authState: false,
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
      if (!action.payload.actionSuccess){
        return {
          ...state,
          loginError: action.payload.message
        }
      }
      return {
        ...state,
        loggedIn: true,
        authState: true,
        loginError: action.payload.message,
      }
    case types.USER_LOGOUT:
      console.log('USER HAS LOGGED OUT', action.payload)
      return {
        ...state,
        loggedIn: false,
      }
    case types.USER_SIGNUP:
      // Assuming response object from POST request is in the form of {userExists: true}
      console.log('USER HAS SIGNED UP: ', action.payload)
      if (!action.payload.actionSuccess){
        return {
          ...state,
          signupError: action.payload.message
        }
      }
      return {
        ...state,
        signupError: action.payload.message,
        loginState: true,
      }
    default:
    return state;
  }
};

export default mainReducer;
