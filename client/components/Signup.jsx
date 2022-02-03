import React from 'react';

const Signup = (props) =>{
  const usernameText = React.createRef();
  const passwordText = React.createRef();
  
  return (
    <div className='signupPopup'>
      <div className='transparentBg'></div>
      <form className='signupForm' onSubmit = {(e)=> {
          e.preventDefault();
          props.signupUser(usernameText.current.value, passwordText.current.value);
          }}>
        <div className='signupText'>Signup</div>
        <input ref={usernameText} type='text' placeholder='username'></input>
        <input ref={passwordText} type='text' placeholder='password'></input>
        <div className='error'>{props.signupError}</div>
        <button type='submit' className='signupButton'>Signup</button>
        <div className='loginLink' onClick={props.clickAction}>
          Login to Account
        </div>
      </form>
    </div>
  );
}

export default Signup;