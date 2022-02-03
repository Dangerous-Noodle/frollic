import React from 'react';

const Signup = (props) =>{
  const usernameText = React.createRef();
  const passwordText = React.createRef();
  
  return (
    <div className = 'signupPopup'>
      <form className = 'signupForm' onSubmit = {(e)=> {
          e.preventDefault();
          props.signupUser(username.current.value, password.current.value)
          }}>
        <div className = 'SignupText'>Signup</div>
        <input ref={usernameText} type='text' placeholder='username'></input>
        <input ref={passwordText} type='password' placeholder='password'></input>
        <button type='submit' className='SignupButton'>Signup</button>
      </form>
    </div>
  );
}

export default Signup;