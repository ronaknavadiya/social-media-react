import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import birthday from "../assets/birthday.png";
import ad from "../assets/img2.jpg";
import { useGlobalContext } from "../Context/AuthContext";
import { Users } from "../tempData";
import OnlineFriends from "./Messenger/OnlineFriends";

const Rightbar = () => {
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [onlineUsers, setOnlineUsers] = useState(null);
  const { user } = useGlobalContext();
  const socket = useRef();
  const [onlineUsersID, setOnlineUsersID] = useState(null);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      const newUsers = users.filter((u) => u.userId !== user._id);
      setOnlineUsersID(
        user.followings.filter((f) => newUsers.some((u) => f === u.userId))
      );
    });
  }, [user]);
  return (
    <RightbarStyled>
      <div className="rightbar-wrapper">
        <div className="birthday-container">
          <img src={birthday} alt="birthday-img" />
          <div className="birthday-text">
            <b> Harsh patel </b>and<b> 4 other friends </b>have a birthday
            today..
          </div>
        </div>
        <img src={ad} alt="ad-img" className="ad-image" />
        <h4 className="rightbar-title">Online Friends</h4>
        <ul className="friend-list">
          {onlineUsersID?.map((userId) => {
            return (
              <div key={userId}>
                <Link
                  to="/messenger"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <OnlineFriends userId={userId} />
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    </RightbarStyled>
  );
};

const RightbarStyled = styled.div`
  flex: 3.5;

  .rightbar-wrapper {
    padding: 20px 20px 0 0;
    .birthday-container {
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      .birthday-text {
        font-weight: 300;
        font-size: 15px;
      }
    }
    .ad-image {
      width: 100%;
      border-radius: 10px;
      margin: 10px 0;
    }
    .rightbar-title {
      margin-bottom: 10px;
    }

    .friend-list {
      padding: 0;
      margin-left: 10px;
      list-style: none;
    }
  }
`;

export default Rightbar;
