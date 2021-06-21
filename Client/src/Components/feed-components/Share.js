import React from "react";
import styled from "styled-components";
import ronak from "../../assets/ronak.jpg";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";

const Share = () => {
  return (
    <ShareStyled>
      <div className="share-wrapper">
        <div className="share-top">
          <img src={ronak} alt="profile pic" />
          <input placeholder="Wanna share with friends..." />
        </div>
        <hr />
        <div className="share-bottom">
          <div className="share-options">
            <div className="share-option">
              <PermMedia htmlColor="tomato" />
              <span className="option-text">photo or video</span>
            </div>
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
            <button className="share-button">Share</button>
          </div>
        </div>
      </div>
    </ShareStyled>
  );
};

const ShareStyled = styled.div`
  width: 100%;
  height: 170px;
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
