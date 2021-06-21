import React from "react";
import styled from "styled-components";
import birthday from "../assets/birthday.png";
import ad from "../assets/img2.jpg";
import { Users } from "../tempData";

const Rightbar = () => {
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
          {Users.map((user) => {
            return (
              <div key={user.id}>
                <li className="friend">
                  <div className="profile-image-container">
                    <img src={user.profilepicture} alt="" />
                    <span className="online-status"></span>
                  </div>
                  <span className="username">{user.username}</span>
                </li>
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
      .friend {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        .profile-image-container {
          margin-right: 10px;
          position: relative;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            margin: 10px 0;
          }
          .online-status {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: limegreen;
            position: absolute;
            top: 10px;
            right: -2px;
            border: 1px solid white;
          }
        }
        .username {
          font-weight: 500;
        }
      }
    }
  }
`;

export default Rightbar;
