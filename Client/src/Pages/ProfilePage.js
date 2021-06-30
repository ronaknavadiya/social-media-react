import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import Toolbar from "../Components/Toolbar";
import Feeds from "../Components/Feeds";
import ProfilePageRightbar from "../Components/ProfilePageRightbar";
import axios from "axios";
import { useParams } from "react-router";
import { storage } from "../Firebase";
import { useGlobalContext } from "../Context/AuthContext";

const ProfilePage = () => {
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const params = useParams();
  const [progress, setProgress] = useState(null);
  const { user: currentUser, dispatch } = useGlobalContext();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${params.username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [params.username]);

  const UploadPic = async (e, flag) => {
    e.preventDefault();
    console.log("flag", flag);
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      let name = "";
      if (flag) {
        name = "profilePicture";
      } else {
        name = "coverPicture";
      }

      const uploadTask = storage
        .ref(`images/${name}/${user._id}/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(name)
            .child(user._id)
            .child(e.target.files[0].name)
            .getDownloadURL()
            .then(async (url) => {
              console.log("url", url);
              try {
                if (flag) {
                  await axios.put(`/users/${user._id}`, {
                    userId: user._id,
                    profilePicture: url,
                  });
                  dispatch({ type: "CHANGE_PROFILE_PIC", payload: url });
                } else {
                  await axios.put(`/users/${user._id}`, {
                    userId: user._id,
                    coverPicture: url,
                  });
                  dispatch({ type: "CHANGE_COVER_PIC", payload: url });
                }
                window.alert("Your picture has been updated");
                window.location.reload();
              } catch (error) {
                console.log("error", error);
              }
            });
        }
      );
    }
  };

  return (
    <React.Fragment>
      <Toolbar />
      <ProfilePageStyled>
        <Sidebar />
        <div className="profilePageRight">
          <div className="profilePageRightTop">
            <div className="profileCover">
              <label htmlFor="coverImage">
                <img
                  src={user.coverPicture || public_folder + "noCoverImage.jpg"}
                  className="coverImage"
                  alt=""
                />
                {currentUser.username === user.username && (
                  <input
                    type="file"
                    id="coverImage"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => UploadPic(e, 0)}
                    style={{ display: "none" }}
                  />
                )}
              </label>
              <label htmlFor="profileImage">
                <img
                  src={user.profilePicture || public_folder + "noAvatar.png"}
                  className="userImage"
                  alt=""
                />
                {currentUser.username === user.username && (
                  <input
                    type="file"
                    id="profileImage"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => UploadPic(e, 1)}
                    style={{ display: "none" }}
                  />
                )}
              </label>
            </div>
            <div className="profileInfo">
              <h4>{user.username}</h4>
              <span>{user.desc}</span>
            </div>
          </div>
          <div className="profilePageRightBottom">
            <Feeds username={`${params.username}`} />
            <ProfilePageRightbar user={user} />
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
          cursor: pointer;
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
          cursor: pointer;
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
