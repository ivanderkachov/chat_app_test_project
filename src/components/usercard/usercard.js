import React from "react";

import Image from "../../images/logo192.png";
import './usercard.css'

const Usercard = ({ user, conversations }) => {
  const convExist = Object.values(conversations).find((c) => c.members.includes(user._id))
  return (
    <div className="userContainer">
      <img className="userImg" src={Image} alt="" />
      <span className="userName">
        {convExist ? (
          <>
            <span>{user.name}</span>
            <span className="action"> Continue conversation</span>
          </>
        ) : (
          <>
            <span>{user.name}</span>
            <span className="action"> Add to chat list</span>
          </>
        )}
      </span>
    </div>
  );
}

export default Usercard