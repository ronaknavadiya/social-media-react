import React, { useRef, useState } from "react";
import styled from "styled-components";
import ronak from "../../assets/ronak.jpg";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useGlobalContext } from "../../Context/AuthContext";
import axios from "axios";
import { storage } from "../../Firebase";

const Share = () => {
  const { user } = useGlobalContext();
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      await setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const uploadTask = storage
        .ref(`images/posts/${user._id}/${file.name}`)
        .put(file);
      uploadTask.on(
        "state_change",
        (snapshot) => {
          let prog =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child("posts")
            .child(user._id)
            .child(file.name)
            .getDownloadURL()
            .then(async (url) => {
              const newPost = {
                userId: user._id,
                desc: desc.current.value,
                img: url,
              };
              console.log("newPOST", newPost);
              try {
                await axios.post("/posts", newPost);
                window.alert("Post Has been Uploaded..");
                window.location.reload();
              } catch (error) {
                console.log(error);
              }
            });
        }
      );
    } else {
      const newPost = {
        userId: user._id,
        desc: desc.current.value,
      };
      console.log("newPOST", newPost);
      try {
        await axios.post("/posts", newPost);
        window.alert("Post Has been Uploaded..");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ShareStyled>
      <div className="share-wrapper">
        <div className="share-top">
          <img
            src={user.profilePicture || public_folder + "noAvatar.png"}
            alt="profile pic"
          />
          <input
            placeholder={`Hey ${user.username}, You wanna share something with friends?`}
            ref={desc}
          />
        </div>
        <hr />
        {file && (
          <div className="img-container">
            <img src={URL.createObjectURL(file)} alt="shareimg" />
            <progress value={progress} max="100" style={{ width: "100%" }} />
            {progress} %
            <Cancel className="cancel-img" onClick={() => setFile(null)} />
          </div>
        )}

        <form className="share-bottom" onSubmit={handleSubmit}>
          <div className="share-options">
            <label htmlFor="file" className="share-option">
              <PermMedia htmlColor="tomato" />
              <span className="option-text">photo or video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={uploadImage}
              />
            </label>
            <div className="share-option">
              <Label htmlColor="blue" />
              <span className="option-text">Tag</span>
            </div>
            <div className="share-option">
              <Room htmlColor="grey" />
              <span className="option-text">Location</span>
            </div>
            <div className="share-option">
              <EmojiEmotions htmlColor="goldenrod" />
              <span className="option-text">Feelings</span>
            </div>
            <button className="share-button" type="submit">
              Share
            </button>
          </div>
        </form>
      </div>
    </ShareStyled>
  );
};

const ShareStyled = styled.div`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 35px -4px rgba(0, 0, 0, 0.69);
  box-shadow: 0px 0px 35px -4px rgba(0, 0, 0, 0.69);

  .share-wrapper {
    padding: 10px;
  }
  .share-top {
    display: flex;
    align-items: center;
    img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }
    input {
      border: none;
      width: 80%;
      font-size: 0.9rem;
    }
    input:focus {
      outline: none;
    }
  }
  hr {
    margin: 20px;
  }
  .img-container {
    padding: 0 20px 10px 20px;
    position: relative;
    img {
      width: 100%;
      object-fit: cover;
    }
    .cancel-img {
      position: absolute;
      top: 0;
      right: 20px;
      cursor: pointer;
      font-size: 30px;
    }
  }
  .share-bottom {
    .share-options {
      display: flex;
      justify-content: space-evenly;
      .share-option {
        display: flex;
        align-items: center;
        cursor: pointer;
        svg {
          font-size: 1.4rem;
          margin-right: 5px;
        }
        .option-text {
          font-size: 1rem;
          font-weight: 500;
        }
      }
    }
    .share-button {
      border: none;
      padding: 7px 12px;
      border-radius: 5px;
      background-color: var(--border-color);
      color: white;
      font-weight: 500;
      cursor: pointer;
    }
  }
`;
export default Share;
