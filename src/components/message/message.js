import React from "react";
import dateFormat from "dateformat";


import './message.css'
import Image from '../../images/logo192.png'

const Message = ({ message, time, own }) => {

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={Image} alt=""/>
        <p className="messageText">{message}</p>
      </div>
      <div className="messageBottom">{dateFormat(time, "m/d/yy, h:MM TT")}</div>
    </div>
  )
}

export default Message