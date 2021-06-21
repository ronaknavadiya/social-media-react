import React from "react";
import styled from "styled-components";

const ProfilePageRightbar = () => {
  return (
    <ProfilePageRightbarStyled>
      <div className="rightbar-wrapper">
        <h4 className="rightbar-title">About me</h4>
        <div className="user-info">
          <div className="user-info-item">
            <span className="info-key">City:</span>
            <span className="info-value">Surat</span>
          </div>
          <div className="user-info-item">
            <span className="info-key">From:</span>
            <span className="info-value">India</span>
          </div>
          <div className="user-info-item">
            <span className="info-key">Relationship:</span>
            <span className="info-value">Single</span>
          </div>
        </div>
        <h4 className="rightbar-title">Friends</h4>
        <div className="followings-container">
          <div className="followings">
            <img src="assets/img1.jpg" alt="" />
            <h3> John wick</h3>
          </div>
          <div className="followings">
            <img src="assets/img2.jpg" alt="" />
            <h3> John wick</h3>
          </div>
          <div className="followings">
            <img src="assets/img3.jpg" alt="" />
            <h3> John wick</h3>
          </div>
          <div className="followings">
            <img src="assets/img3.jpg" alt="" />
            <h3> John wick</h3>
          </div>
          <div className="followings">
            <img src="assets/img3.jpg" alt="" />
            <h3> John wick</h3>
          </div>
        </div>
      </div>
    </ProfilePageRightbarStyled>
  );
};

const ProfilePageRightbarStyled = styled.div`
  flex: 3.5;
  .rightbar-wrapper {
    padding: 20px 20px 0 0;
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
          margin-left: 4px;
          margin-top: 4px;
        }
      }
    }
  }
`;

export default ProfilePageRightbar;
