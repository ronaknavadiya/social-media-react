import React from "react";
import styled from "styled-components";
import { Users } from "../tempData";
import {
  Bookmark,
  Chat,
  Event,
  Group,
  HelpOutline,
  PlayCircleFilledOutlined,
  RssFeed,
  School,
  WorkOutline,
} from "@material-ui/icons";

const Sidebar = () => {
  return (
    <SidebarStyled>
      <div className="sidebar-wrapper">
        <ul className="sidebar-list">
          <li className="list-item">
            <RssFeed />
            <span className="list-item-text">Feed</span>
          </li>
          <li className="list-item">
            <Chat />
            <span className="list-item-text">Chats</span>
          </li>
          <li className="list-item">
            <PlayCircleFilledOutlined />
            <span className="list-item-text">Videos</span>
          </li>
          <li className="list-item">
            <Group />
            <span className="list-item-text">Groups</span>
          </li>
          <li className="list-item">
            <Bookmark />
            <span className="list-item-text">Bookmarks</span>
          </li>
          <li className="list-item">
            <HelpOutline />
            <span className="list-item-text">Questions</span>
          </li>
          <li className="list-item">
            <WorkOutline />
            <span className="list-item-text">Jobs</span>
          </li>
          <li className="list-item">
            <Event />
            <span className="list-item-text">Events</span>
          </li>
          <li className="list-item">
            <School />
            <span className="list-item-text">Courses</span>
          </li>
        </ul>
        <button className="sidebar-button">Show More</button>
        <hr className="sidebar-hr" />
        <ul className="sidebar-friend-list">
          {Users.map((closeFriend) => {
            return (
              <div>
                <li className="sidebar-friend">
                  <img src={closeFriend.profilepicture} alt="" />
                  <span className="friend-name">{closeFriend.username}</span>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </SidebarStyled>
  );
};
const SidebarStyled = styled.div`
  flex: 3;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  position: sticky;
  top: 50px;
  z-index: 2;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(179, 179, 179);
  }
  .sidebar-wrapper {
    padding: 20px;

    .sidebar-list {
      padding: 0;
      margin: 0;
      list-style: none;
      .list-item {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        svg {
          margin-right: 15px;
        }
        .list-item-text {
        }
      }
    }
    .sidebar-button {
      width: 150px;
      border: none;
      padding: 10px;
      border-radius: 5px;
      font-weight: 500;
      cursor: pointer;
    }
    .sidebar-hr {
      margin: 1rem 0;
    }
    .sidebar-friend-list {
      padding: 0;
      margin: 0;
      list-style: none;
      .sidebar-friend {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 0.4rem;
        }
        .friend-name {
        }
      }
    }
  }
`;
export default Sidebar;
