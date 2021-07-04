import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  Cancel,
  Chat,
  Notifications,
  Person,
  Search,
} from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useGlobalContext } from "../Context/AuthContext";
import axios from "axios";

const Toolbar = () => {
  const { dispatch, user } = useGlobalContext();
  const history = useHistory();
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
  const search = useRef();
  const [userList, setUserList] = useState([]);

  const handleSearch = async () => {
    const searchText = search.current.value;
    if (searchText) {
      try {
        const users = await axios.get(`/users/search/${searchText}`);
        setUserList(users.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      search.current.value = "";
      setUserList([]);
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });
    history.push("/login");
  };
  return (
    <ToolbarStyled>
      <div className="toolbar-left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">NJoy</span>
        </Link>
      </div>
      <div className="toolbar-center">
        <div className="serachbar">
          <Search />
          <input
            placeholder="Search here.."
            className="search-input"
            ref={search}
            onChange={handleSearch}
          />

          {search.current?.value && (
            <div className="user-list">
              {userList.map((uname) => {
                return (
                  <Link
                    key={uname}
                    to={`/profile/${uname}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div
                      className="user-name"
                      onClick={() => {
                        setUserList([]);
                        search.current.value = "";
                      }}
                    >
                      {uname}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          <Cancel
            className="cancel"
            onClick={() => {
              setUserList([]);
              search.current.value = "";
            }}
          />
        </div>
      </div>
      <div className="toolbar-right">
        <div className="toolbar-links">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <span className="link">Homepage</span>
          </Link>
          <span className="link" onClick={handleLogout}>
            LogOut
          </span>
        </div>
        <div className="toolbar-icons">
          <div className="toolbar-icon-item">
            <Person />
            <span className="toolbar-icon-badgw">1</span>
          </div>
          <Link
            to="/messenger"
            style={{ color: "white", textDecoration: "none" }}
          >
            <div className="toolbar-icon-item">
              <Chat />
              <span className="toolbar-icon-badgw">1</span>
            </div>
          </Link>
          <div className="toolbar-icon-item">
            <Notifications />
            <span className="toolbar-icon-badgw">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture || public_folder + "NoAvatar.png"}
            alt="user profile pic"
            className="toolbar-image"
          />
        </Link>
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
      position: relative;
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
      .user-list {
        position: absolute;
        top: 31px;
        left: 20px;
        background-color: #fffafa;
        width: 90%;
        .user-name {
          padding-left: 15px;
          padding-top: 5px;
          padding-bottom: 5px;
          cursor: pointer;
        }
        .user-name:hover {
          background-color: lightgray;
        }
      }
      .cancel {
        cursor: pointer;
      }
    }
  }
  .toolbar-right {
    flex: 4;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;
    .toolbar-links {
      .link {
        margin-left: 10px;
        cursor: pointer;
        font-size: 1.2rem;
      }
      .link:focus {
        font-size: 30rem;
      }
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
      border: 2px solid var(--border-color);
    }
  }
`;
export default Toolbar;
