import React from 'react';

const Login = (props) => {
  const usernameText = React.createRef();
  const passwordText = React.createRef();

  return (
    <div className='loginPopup'>
      <form className='loginForm' onSubmit={(e) => {
        e.preventDefault();
        // console.log(usernameText.current.value, passwordText.current.value);
        props.loginUser(usernameText.current.value, passwordText.current.value);
        }} >
        <div className='loginText'>Login</div>
        <input ref={usernameText} type='text' placeholder='username'></input>
        <input ref={passwordText} type='password' placeholder='password'></input>
        <button type='submit' className='loginButton'>Login</button>
      </form> 
      {/* <div className = 'signupLink'>
        <a href ={/}> Create an Account</a>
      </div> */}
    </div>
  );
}

export default Login;
