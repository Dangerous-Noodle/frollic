import React from 'react';

const ProfileIcon= (props) => {
  return (
    <div id="profile-container">
      
      {/* <button id="profile-icon" onClick={props.clickAction}> */}
        <input id="profile-icon" type="image" src = "https://img.icons8.com/small/32/000000/gender-neutral-user.png" onClick={props.clickAction} alt ="icon"/>
      {/* </button> */}
    </div>
  );
}

export default ProfileIcon;
