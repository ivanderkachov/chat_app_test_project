import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getConversations, getUsers, postMessage, postMessageCN } from "../../redux/reducers/chat";


import './chat.css'

import Conversation from "../../components/conversation/conversation";
import Message from "../../components/message/message";
import ChatOnline from "../../components/chatOnline/chatonline";

const Chat = () => {

  const user = useSelector((store) => store.chat.user)
  const [addMessage, setAddMessage] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getConversations(user._id))
  },[user._id, addMessage])

  useEffect(() => {
    dispatch(getUsers())
  },[])


  const [currentConversation, setCurrentConversation] = useState(null)
  const [message, setMessage] = useState('')
  const conversations = useSelector((store) => store.chat.conversations)
  const scrollRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = {
      sender: user._id,
      text: message,
      createdAt: new Date().toISOString()
    }
    const friendId = currentConversation.members.find((member) => member !== user._id);
    const newMessageCN = {
      sender: friendId,
      text: "",
      createdAt: new Date().toISOString()
    }
    dispatch(postMessage(currentConversation._id, newMessage))
    setTimeout(() => {
      dispatch(postMessageCN(currentConversation._id, user._id, newMessageCN));
    }, 5000)
    setMessage('')
    setAddMessage(newMessage)
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  },[conversations, currentConversation])

  return (
    <>
      <div className="header"></div>
      <div className="chat">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {Object.entries(conversations).map((conversation) => {
              return (
                <div
                  key={conversation[0]}
                  onClick={() => {setCurrentConversation(conversation[1])}}
                >
                  <Conversation conversation={conversation[1]} user={user} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentConversation ? (
              <>
                <div className="chatBoxTop">
                  {conversations[currentConversation._id].messages.map((message) => {
                    return (
                      <div ref={scrollRef} key={message._id}><Message message={message.text} time={message.createdAt} own={message.sender === user._id ? true : false}/></div>
                    )
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    value={message}
                    placeholder="write something..."
                    onChange={(e) => {setMessage(e.target.value);}}
                  />
                  <button
                  type="button"
                  className="chatSubmitButton"
                  onClick={handleSubmit}>Send</button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat