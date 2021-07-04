import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../Context/AuthContext";
import { format } from "timeago.js";

const Messages = ({ ownMessage, message }) => {
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useGlobalContext();
  const [friend, setFriend] = useState({});

  useEffect(() => {
    if (!ownMessage) {
      const fetchFriend = async () => {
        try {
          const res = await axios.get(`/users?userId=${message.sender}`);
          setFriend(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchFriend();
    } else {
      setFriend(user);
    }
  }, [message, ownMessage, user]);

  return (
    <MessageStyled>
      <div className={`${ownMessage ? "wrapper wrapper-own" : "wrapper"}  `}>
        <div
          className={`${
            ownMessage ? "message-top message-top-own" : "message-top"
          }  `}
        >
          <img
            src={friend?.profilePicture || public_folder + "noAvatar.png"}
            alt=""
          />
          <p className={`${ownMessage ? "message-own" : ""}  `}>
            {message?.text}
          </p>
        </div>
        <div className="message-bottom">{format(message.createdAt)}</div>
      </div>
    </MessageStyled>
  );
};
const MessageStyled = styled.div`
  .wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .message-top {
      display: flex;
      img {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 10px;
      }
      p {
        padding: 10px;
        background-color: #1877f2;
        border-radius: 20px;
        color: white;
        max-width: 60%;
      }
      .message-own {
        background-color: rgb(245, 241, 241);
        color: black;
      }
    }
    .message-top-own {
      justify-content: flex-end;
    }
    .message-bottom {
      font-size: 12px;
      margin-top: 10px;
    }
  }

  .wrapper-own {
    align-items: flex-end;
  }
`;

export default Messages;
