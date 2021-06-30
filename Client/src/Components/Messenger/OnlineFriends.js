import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useGlobalContext } from "../../Context/AuthContext";

const OnlineFriends = ({ userId }) => {
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [onlineUser, setOnlineUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${userId}`);
        setOnlineUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <OnlineFriendsStyled>
      <div className="friend">
        <img
          src={onlineUser.profilePicture || public_folder + "noAvatar.png"}
          alt=""
        />
        <div className="onlineBadge"></div>
      </div>
      <span className="username">{onlineUser.username}</span>
    </OnlineFriendsStyled>
  );
};
const OnlineFriendsStyled = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  .friend {
    position: relative;
    border: 1px solid white;
    img {
      margin-right: 10px;
      height: 40px;
      width: 40px;
      object-fit: cover;
      border-radius: 50%;
    }
    .onlineBadge {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: limegreen;
      right: 8px;
      top: 0;
    }
  }
  .username {
  }
`;

export default OnlineFriends;
