import React from "react";
import { useSelector } from "react-redux";

// import { getUsers } from "../../redux/reducers/chat";

import './conversation.css'
import image from '../../images/logo192.png'

const Conversation = ({conversation, user }) => {

  const users = useSelector((store) => store.chat.users)
  const friendId = conversation.members.find((member) => member !== user._id)

  return (
    <div className="conversation">
      <img className="conversationImg" src={image} alt="img" />
      <span className="conversationName">{users[friendId].name}</span>
    </div>
  )
}

export default Conversation