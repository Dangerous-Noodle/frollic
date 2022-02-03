import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import ProfileIcon from './ProfileIcon.jsx';
// import Logo from './Logo.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

const mapStateToProps = (state) => ({
  loggedIn: state.search.loggedIn,
  loginState: state.search.loginState,
  usernameExists: state.search.usernameExists,
});

const mapDispatchToProps = (dispatch) => ({
    toggleFavsPage: () => {
      dispatch(actions.toggleFavsPage());
    },
    toggleLogin: () => {
      dispatch(actions.toggleLogin());
    },
    loginUser: (username, password) => {
      dispatch(actions.userLogin(username, password));
    },
    signupUser: (username, password) =>{
      dispatch(actions.userSignup(username, password))
    }
  });

const Navbar = (props) => {
  return (
    <div id="nav">
      <a href="/"><img id="logo" alt="frollic-logo" src="/assets/logo.png"></img></a>
      {props.loggedIn ? null : props.loginState ? <Login loginUser={props.loginUser}/> : <Signup signupUser={props.signupUser} usernameExists={props.usernameExists}/>}
      <ProfileIcon clickAction={props.loggedIn ? props.toggleFavesPage : props.toggleLogin} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
