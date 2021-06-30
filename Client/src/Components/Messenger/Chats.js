import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../Context/AuthContext";
import axios from "axios";

const Chats = ({ chat }) => {
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useGlobalContext();
  const [friend, setFriend] = useState({});

  useEffect(() => {
    const friendId = chat.members.filter((userid) => user._id !== userid);
    const fetchFriend = async () => {
      try {
        const res = await axios.get(`/users?userId=${friendId}`);
        setFriend(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriend();
  }, [chat, user]);

  return (
    <ChatsStyled>
      <div className="container">
        <img
          src={friend?.profilePicture || public_folder + "noAvatar.png"}
          alt=""
        />
        <span>{friend?.username}</span>
      </div>
    </ChatsStyled>
  );
};
const ChatsStyled = styled.div`
  .container {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-top: 20px;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 20px;
    }
    span {
      font-weight: 500;
    }
  }
  .container:hover {
    background-color: rgb(245, 243, 243);
  }
`;

export default Chats;
