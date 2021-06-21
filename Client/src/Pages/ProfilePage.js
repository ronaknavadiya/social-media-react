import React from "react";
import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import Toolbar from "../Components/Toolbar";
import Feeds from "../Components/Feeds";
import ProfilePageRightbar from "../Components/ProfilePageRightbar";

const ProfilePage = () => {
  return (
    <React.Fragment>
      <Toolbar />
      <ProfilePageStyled>
        <Sidebar />
        <div className="profilePageRight">
          <div className="profilePageRightTop">
            <div className="profileCover">
              <img src="assets/img1.jpg" className="coverImage" alt="" />
              <img src="assets/avatar.jpg" className="userImage" alt="" />
            </div>
            <div className="profileInfo">
              <h4>ROnak Navadiya</h4>
              <span>Hello , On MY Way</span>
            </div>
          </div>
          <div className="profilePageRightBottom">
            <Feeds />
            <ProfilePageRightbar />
          </div>
        </div>
      </ProfilePageStyled>
    </React.Fragment>
  );
};

const ProfilePageStyled = styled.div`
  display: flex;
  .profilePageRight {
    flex: 9;
    .profilePageRightTop {
      .profileCover {
        height: 320px;
        position: relative;
        .coverImage {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }
        .userImage {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          top: 8rem;
          border: 3px solid var(--border-color);
        }
      }
      .profileInfo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 1.8rem;
        h4 {
          font-size: 1.8rem;
        }
        span {
          font-weight: 300;
        }
      }
    }
    .profilePageRightBottom {
      display: flex;
    }
  }
`;

export default ProfilePage;
