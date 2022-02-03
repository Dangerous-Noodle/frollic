import React from 'react';

const Login = (props) => {
  const usernameText = React.createRef();
  const passwordText = React.createRef();

  return (
    <div className='loginPopup'>
      <div className='transparentBg'></div>
      <form className='loginForm' onSubmit={(e) => {
        e.preventDefault();
        props.loginUser(usernameText.current.value, passwordText.current.value);
        }} >
        <div className='loginText'>Login</div>
        <input ref={usernameText} type='text' placeholder='username'></input>
        <input ref={passwordText} type='text' placeholder='password'></input>
        <div className='error'>{props.loginError}</div>
        <button type='submit' className='loginButton'>Login</button>
        <div className='signupLink' onClick={props.clickAction}>
          Create an Account
        </div>
      </form> 
    </div>
  );
}

export default Login;
