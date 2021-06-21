import React from "react";
import styled from "styled-components";
import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import profilePicture from "../assets/avatar.jpg";

const Toolbar = () => {
  return (
    <ToolbarStyled>
      <div className="toolbar-left">
        <span className="logo">NJoy</span>
      </div>
      <div className="toolbar-center">
        <div className="serachbar">
          <Search />
          <input placeholder="Search here.." className="search-input" />
        </div>
      </div>
      <div className="toolbar-right">
        <div className="toolbar-links">
          <span className="link">Homepage</span>
          <span className="link">Timeline</span>
        </div>
        <div className="toolbar-icons">
          <div className="toolbar-icon-item">
            <Person />
            <span className="toolbar-icon-badgw">1</span>
          </div>
          <div className="toolbar-icon-item">
            <Chat />
            <span className="toolbar-icon-badgw">1</span>
          </div>
          <div className="toolbar-icon-item">
            <Notifications />
            <span className="toolbar-icon-badgw">1</span>
          </div>
        </div>
        <img
          src={profilePicture}
          alt="user profile pic"
          className="toolbar-image"
        />
      </div>
    </ToolbarStyled>
  );
};

const ToolbarStyled = styled.div`
  height: 50px;
  width: 100%;
  background-color: #1877f2;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;

  .toolbar-left {
    flex: 3;
    .logo {
      font-size: 1.7rem;
      margin-left: 2rem;
      font-weight: bold;
      color: white;
      cursor: pointer;
    }
  }
  .toolbar-center {
    flex: 5;
    .serachbar {
      width: 100%;
      height: 30px;
      background-color: white;
      border-radius: 30px;
      display: flex;
      align-items: center;
      svg {
        font-size: 1.8rem;
        margin-left: 1rem;
      }
      .search-input {
        border: none;
        width: 80%;
        font-size: 1rem;
        margin-left: 0.8rem;
      }
      .search-input:focus {
        outline: none;
      }
    }
  }
  .toolbar-right {
    flex: 4;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;
    .link {
      margin-left: 10px;
      cursor: pointer;
      font-size: 1.2rem;
    }
    .toolbar-icons {
      display: flex;
      .toolbar-icon-item {
        margin-right: 15px;
        cursor: pointer;
        position: relative;
        .toolbar-icon-badgw {
          position: absolute;
          height: 15px;
          width: 15px;
          background-color: red;
          border-radius: 50%;
          top: -5px;
          right: -5px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
        }
      }
    }
    .toolbar-image {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      object-fit: cover;
      cursor: pointer;
    }
  }
`;
export default Toolbar;