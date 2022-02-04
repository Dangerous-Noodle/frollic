import React from 'react';

const Logout= (props) => {
  return (
    <div id="logout-container">
      <button id="logout button" onClick={props.clickAction}>Logout
      </button>
    </div>
  );
}

export default Logout;
