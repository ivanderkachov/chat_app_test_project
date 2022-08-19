import React from "react";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";


import './conversation.css'
import image from '../../images/logo192.png'

const Conversation = ({conversation, user }) => {

  const users = useSelector((store) => store.chat.users)
  const friendId = conversation.members.find((member) => member !== user._id)
  const lastMessage = conversation.messages[conversation.messages.length-1]

  return (
    <div className="conversationContainer">
      <div className="conversationData">
        <img className="conversationImg" src={image} alt="img" />
        <div className="conversationText">
          <span className="conversationName">{users[friendId].name}</span>
          <span className="conversationLastMessage">{lastMessage ? lastMessage.text : ""}</span>
        </div>
      </div>
      <div className="conversationLastMessageDate">
        {lastMessage ? dateFormat(lastMessage.createdAt, "mmm d, yyyy") : ""}
      </div>
    </div>
  );
}

export default Conversation