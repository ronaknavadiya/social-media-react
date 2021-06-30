import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../Context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

const ProfilePageRightbar = ({ user }) => {
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useGlobalContext();
  const [isFollowed, setIsFollowed] = useState(false);
  const { dispatch } = useGlobalContext();

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        const res = await axios.get(`/users/friends/${user._id}`);
        setFriends(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchUserFriends();
  }, [user?._id]);

  useEffect(() => {
    setIsFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user._id]);

  const handleFollowBtn = async () => {
    try {
      console.log("isefolowed", isFollowed);
      if (isFollowed) {
        const res = await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW_USER", payload: user._id });
        console.log("res", res);
      } else {
        const res = await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW_USER", payload: user._id });
        console.log("res", res);
      }
      setIsFollowed(!isFollowed);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProfilePageRightbarStyled>
      <div className="rightbar-wrapper">
        {user.username !== currentUser.username && (
          <button
            className={`${isFollowed ? "unfollow-btn" : "follow-btn"}`}
            onClick={handleFollowBtn}
          >
            {isFollowed ? "Following" : "Follow"}
            {isFollowed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbar-title">About me</h4>
        <div className="user-info">
          <div className="user-info-item">
            <span className="info-key">City:</span>
            <span className="info-value">{user.city}</span>
          </div>
          <div className="user-info-item">
            <span className="info-key">From:</span>
            <span className="info-value">{user.from}</span>
          </div>
          <div className="user-info-item">
            <span className="info-key">Relationship:</span>
            <span className="info-value">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbar-title">Friends</h4>
        <div className="followings-container">
          {friends.map((friend) => {
            return (
              <Link
                to={`/profile/${friend.username}`}
                style={{ textDecoration: "none" }}
                key={friend._id}
              >
                <div className="followings">
                  <img
                    src={
                      friend.profilePicture || public_folder + "noAvatar.png"
                    }
                    alt=""
                  />
                  <h3>{friend.username}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </ProfilePageRightbarStyled>
  );
};

const ProfilePageRightbarStyled = styled.div`
  flex: 3.5;
  .rightbar-wrapper {
    padding: 20px 20px 0 0;
    .follow-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #1872f2;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      margin: 10px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
    }
    .follow-btn:focus {
      outline: none;
    }
    .follow-btn:hover {
      background-color: var(--border-color);
    }
    .unfollow-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: green;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      margin: 10px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
    }
    .unfollow-btn:focus {
      outline: none;
    }
    .unfollow-btn:hover {
      background-color: red;
    }
    .rightbar-title {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .user-info {
      margin-bottom: 30px;
      .user-info-item {
        margin-bottom: 5px;
        .info-key {
          font-size: 1.1rem;
          font-weight: 500;
          color: #555;
        }
        .info-value {
          margin-left: 10px;
          font-weight: 300;
        }
      }
    }

    .followings-container {
      display: flex;
      flex-wrap: wrap;
      .followings {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        cursor: pointer;
        margin-left: 12px;
        img {
          height: 110px;
          width: 110px;
          object-fit: cover;
          border-radius: 5px;
        }
        h3 {
          font-size: 1rem;
          font-weight: 500;
          margin-left: 20px;
          margin-top: 4px;
        }
      }
    }
  }
`;

export default ProfilePageRightbar;
