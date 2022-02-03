import React from 'react';

const ProfileIcon= (props) => {
  return (
    <div id="profile-container">
      
      <button id="profile-icon" onClick={props.clickAction}>
        <img src="https://img.icons8.com/small/32/000000/gender-neutral-user.png"/>
      </button>
    </div>
  );
}

export default ProfileIcon;
