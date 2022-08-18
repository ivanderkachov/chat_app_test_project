import React from "react";

import './chatonline.css'
import Image from '../../images/logo192.png'

const ChatOnline = () => {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg"src={Image} alt=""/>
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">John Doe</span>
      </div>

    </div>
  )
}

export default ChatOnline