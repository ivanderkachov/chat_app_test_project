import React from "react";
import { format } from "timeago.js"


import './message.css'
import Image from '../../images/logo192.png'

const Message = ({ message, time, own }) => {

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={Image} alt=""/>
        <p className="messageText">{message}</p>
      </div>
      <div className="messageBottom">{format(time)}</div>
    </div>
  )
}

export default Message