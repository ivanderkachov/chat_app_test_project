import React from "react";
import { useSelector } from "react-redux";
import Image from "../../images/logo192.png";

import './conversationHeader.css'

const ConversationHeader = ({ conversation, user }) => {
  const users = useSelector((store) => store.chat.users);
  const friendId = conversation.members.find((member) => member !== user._id);

  return (
    <div className="headerData">
      <img className="headerDataImg" src={Image} alt=""/>
      <span className="headerDataName">{users[friendId].name}</span>
    </div>
  )
}

export default ConversationHeader