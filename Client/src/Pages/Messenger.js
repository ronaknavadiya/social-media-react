import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Chats from "../Components/Messenger/Chats";
import Messages from "../Components/Messenger/Messages";
import OnlineFriends from "../Components/Messenger/OnlineFriends";
import Toolbar from "../Components/Toolbar";
import { useGlobalContext } from "../Context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

const Messenger = () => {
  const { user } = useGlobalContext();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(null);
  const typedMessage = useRef();
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      const newUsers = users.filter((u) => u.userId !== user._id);
      setOnlineUsers(
        user.followings.filter((f) => newUsers.some((u) => f === u.userId))
      );
    });
  }, [user]);

  const sendMessage = async () => {
    const newMessage = {
      chatId: currentChat._id,
      sender: user._id,
      text: typedMessage.current.value,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: typedMessage.current.value,
    });
    try {
      const res = await axios.post("/messages", newMessage);
      setMessages([...messages, newMessage]);
      typedMessage.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(`/chats/${user._id}`);
        setChats(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChats();
  }, [user]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const fetchCurrentChat = async (fID) => {
    try {
      const res = await axios.get(`/chats/find/${fID}/${user._id}`);
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toolbar />
      <MessengerStyled>
        <div className="chatMenu">
          <div className="chatMenu-wrapper">
            <input placeholder="Search your friends here.." />
            {chats.map((chat) => {
              return (
                <div onClick={() => setCurrentChat(chat)} key={chat._id}>
                  <Chats chat={chat} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          {!currentChat ? (
            <span className="intialchat">
              Click on Chat to start talking...
            </span>
          ) : (
            <div className="chatBox-wrapper">
              <div className="chatbox-top">
                {messages.map((message) => {
                  return (
                    <div ref={scrollRef} key={message?._id}>
                      <Messages
                        ownMessage={message.sender === user._id ? true : false}
                        message={message}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="chatbox-bottom">
                <textarea
                  placeholder="Enter your message here.."
                  className="messageInput"
                  ref={typedMessage}
                ></textarea>
                <button onClick={sendMessage}>Send</button>
              </div>
            </div>
          )}
        </div>
        <div className="chatOnline">
          <div className="chatOnline-wrapper">
            <span className="of-title">Online Friends</span>

            {onlineUsers?.map((userId) => {
              return (
                <div
                  onClick={() => fetchCurrentChat(userId)}
                  key={userId && userId}
                >
                  <OnlineFriends userId={userId} />
                </div>
              );
            })}
          </div>
        </div>
      </MessengerStyled>
    </div>
  );
};

const MessengerStyled = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  .chatMenu {
    flex: 3.5;
    .chatMenu-wrapper {
      padding: 10px;
      height: 100%;
      input {
        padding: 10px 0;
        border: none;
        border-bottom: 1px solid grey;
        width: 90%;
      }
    }
  }
  .chatBox {
    flex: 5.5;
    position: relative;
    .intialchat {
      position: absolute;
      top: 20%;
      font-size: 3rem;
      color: rgb(224, 220, 220);
    }
    .chatBox-wrapper {
      padding: 10px;
      height: 100%;
      display: flex;
      flex-direction: column;
      .chatbox-top {
        height: 100%;
        overflow-y: scroll;
        padding-right: 12px;
        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-track {
          background-color: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background-color: rgb(179, 179, 179);
        }
      }
      .chatbox-bottom {
        display: flex;
        margin-top: 5px;
        justify-content: space-between;
        align-items: center;
        .messageInput {
          width: 80%;
          height: 90px;
          padding: 10px;
        }
        button {
          width: 70px;
          height: 40px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          background-color: teal;
          color: white;
        }
      }
    }
  }
  .chatOnline {
    flex: 3;
    .chatOnline-wrapper {
      padding: 10px;
      height: 100%;
      .of-title {
        font-size: 1.4rem;
        font-weight: 500;
        margin: 14px;
      }
    }
  }
`;

export default Messenger;
