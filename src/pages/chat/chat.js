import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  getUsers,
  postMessage,
  postMessageCN,
  getUpdatedConversations
} from "../../redux/reducers/chat";

import "./chat.css";

import Conversation from "../../components/conversation/conversation";
import Message from "../../components/message/message";
import ConversationHeader from "../../components/conversationHeader/conversationHeader";
import Usercard from "../../components/usercard/usercard";
import ChatMenuHeader from "../../components/chatMenuHeader/chatMenuHeader";
import ChatBoxBottom from "../../components/chatBoxBottom/chatBoxBottom";

const Chat = () => {
  const user = useSelector((store) => store.chat.user);
  const [addMessage, setAddMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
    dispatch(getConversations(user._id));
    }
  }, [user._id, addMessage]);

  //  user._id, addMessage;

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const [currentConversation, setCurrentConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [findUsers, setFindUsers] = useState('');

  const users = useSelector((store) => store.chat.users);
  const conversations = useSelector((store) => store.chat.conversations);
  const scrollRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      const newMessage = {
        sender: user._id,
        text: message,
        createdAt: new Date().toISOString(),
      };
      const friendId = currentConversation.members.find(
        (member) => member !== user._id
      );
      const newMessageCN = {
        sender: friendId,
        text: "",
        createdAt: new Date().toISOString(),
      };
      dispatch(postMessage(currentConversation._id, newMessage));
      setTimeout(() => {
        dispatch(
          postMessageCN(currentConversation._id, user._id, newMessageCN)
        );
      }, 5000);
      setMessage("");
      setAddMessage(newMessage);
    }
  };

  const handleChange = (e) => {
    setFindUsers(e.target.value);
    setCurrentConversation('');
  };

  const handleUserCard = (userId, friendId) => {
    dispatch(getUpdatedConversations(userId, friendId))
    const newCurrentConversation = Object.values(conversations).find((c) => c.members.includes(userId) && c.members.includes(friendId))
    setCurrentConversation(newCurrentConversation)
    setFindUsers('')
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, currentConversation]);

  return (
    <>
      <div className="chat">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <ChatMenuHeader user={user} handleChange={handleChange} findUsers={findUsers} />
            {!findUsers ? (
              <>
                <div className="chatMenuHead"> Chats </div>
                {Object.entries(conversations).map((conversation) => {
                  return (
                    <div
                      key={conversation[0]}
                      onClick={() => {
                        setCurrentConversation(conversation[1]);
                        setMessage('')
                      }}
                    >
                      <Conversation
                        conversation={conversation[1]}
                        user={user}
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="findProcess">Find process..</div>
                {Object.values(users).map((it) => {
                  const userStr = it.name.toString().toLowerCase();
                  const findUsersStr = findUsers.toString().toLowerCase();

                  if (userStr.includes(findUsersStr) && user._id !== it._id) {
                    return (
                      <div
                        key={`usercard ${it._id}`}
                        onClick={() => {
                          handleUserCard(user._id, it._id);
                        }}
                      >
                        <Usercard user={it} conversations={conversations} />
                      </div>
                    );
                  }
                })}
              </>
            )}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentConversation ? (
              <>
                <ConversationHeader conversation={currentConversation} user={user}/>
                <div className="chatBoxTop">
                  {conversations[currentConversation._id].messages.map(
                    (message) => {
                      return (
                        <div ref={scrollRef} key={message._id}>
                          <Message
                            message={message.text}
                            sender={message.sender}
                            time={message.createdAt}
                            own={message.sender === user._id ? true : false}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
                <ChatBoxBottom setMessage={setMessage} handleSubmit={handleSubmit} message={message} />
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
