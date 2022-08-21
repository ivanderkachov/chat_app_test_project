import React from "react";

import './chatMenuHeader.css'
import importAll from "../../images/imageLoader";

const images = importAll(
  require.context("../../images", false, /\.(png|jpe?g|svg)$/)
);

const ChatMenuHeader = ({ user, handleChange, findUsers }) => {

  return (
      <div className="chatMenuHeader">
        <div className="chatMenuUserInfo">
          <img className="chatMenuUserImg" src={user.photo ? images[`${user.name}.jpeg`] : images['Nophoto.png']} alt="" />
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