import React from "react";

import './chatMenuHeader.css'
import Image from "../../images/logo192.png";

const ChatMenuHeader = ({ user, handleChange, findUsers }) => {
  return (
      <div className="chatMenuHeader">
        <div className="chatMenuUserInfo">
          <img className="chatMenuUserImg" src={Image} alt="" />
          <span className="chatMenuUserName">{user.name}</span>
        </div>
        <input
          placeholder="Search or start new chat"
          className="chatMenuInput"
          value={findUsers}
          onChange={handleChange}
        />
      </div>
  );
}

export default ChatMenuHeader