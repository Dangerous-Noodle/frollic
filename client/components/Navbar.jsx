import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import ProfileIcon from './ProfileIcon.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Logout from './Logout.jsx';

const mapStateToProps = (state) => ({
  authState: state.search.authState,
  loggedIn: state.search.loggedIn,
  loginState: state.search.loginState,
  usernameExists: state.search.usernameExists,
  signupError: state.search.signupError,
  loginError: state.search.loginError,
});

const mapDispatchToProps = (dispatch) => ({
    toggleFavsPage: () => {
      dispatch(actions.toggleFavsPage());
    },
    toggleLogin: () => {
      dispatch(actions.toggleLogin());
    },
    toggleAuth: () => {
      dispatch(actions.toggleAuth());
    },
    loginUser: (username, password) => {
      dispatch(actions.userLogin(username, password));
    },
    logoutUser: () => {
      dispatch(actions.userLogout());
    },
    signupUser: (username, password) =>{
      dispatch(actions.userSignup(username, password))
    }
  });

const Navbar = (props) => {
  return (
    <div id="nav">
      <a href="/"><img id="logo" alt="frollic-logo" src="/assets/logo.png"></img></a>
      {props.authState ? null : props.loginState ? 
        <Login 
          loginUser={props.loginUser} 
          loginError={props.loginError} 
          clickAction={props.toggleLogin}/> : 
        <Signup 
          signupUser={props.signupUser} 
          usernameExists={props.usernameExists}
          signupError={props.signupError} 
          clickAction={props.toggleLogin}/>}
      <ProfileIcon clickAction={props.loggedIn ? props.toggleFavsPage : props.toggleAuth} />
      {props.loggedIn ? 
        <Logout clickAction={props.logoutUser}/> :
         null}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
