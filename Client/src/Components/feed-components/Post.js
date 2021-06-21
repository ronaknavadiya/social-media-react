import { MoreVert } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import like from "../../assets/like.png";
import heart from "../../assets/heart.png";
import { Users } from "../../tempData";

const Post = ({ post }) => {
  const user = Users.filter((user) => user.id === post.userId);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
  };

  return (
    <PostStyled>
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <img src={user[0].profilepicture} alt="user-profile-pic" />
            <div className="name-and-time">
              <span className="post-username">{user[0].username}</span>
              <div className="post-date">{post.date}</div>
            </div>
          </div>
          <div className="post-top-right">
            <MoreVert />
          </div>
        </div>
        <div className="post-center">
          <span className="post-desc">{post?.desc}</span>
          <img src={post.photo} alt="post-img" />
        </div>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <img src={like} alt="like button" onClick={likeHandler} />
            <img src={heart} alt="heart button" onClick={likeHandler} />
            <span className="likeCount">{likeCount}</span>
          </div>
          <div className="post-bottom-right">
            <span className="commentText">{post.comments} Comments</span>
          </div>
        </div>
      </div>
    </PostStyled>
  );
};

const PostStyled = styled.div`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.74);
  box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.74);
  margin: 2rem 0;
  .post-wrapper {
    padding: 10px;
    .post-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .post-top-left {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
          margin-right: 10px;
          object-fit: cover;
          border-radius: 50%;
        }
        .name-and-time {
          .post-username {
            font-size: 1.1rem;
            font-weight: 500;
          }
          .post-date {
            font-size: small;
          }
        }
      }
      .post-top-right {
        svg {
        }
      }
    }

    .post-center {
      margin: 20px 0;
      .post-desc {
      }
      img {
        width: 100%;
        margin-top: 20px;
        max-height: 500px;
        object-fit: contain;
      }
    }
    .post-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .post-bottom-left {
        display: flex;
        align-items: center;
        img {
          height: 24px;
          width: 24px;
          margin-right: 5px;
          cursor: pointer;
        }
        .likeCount {
          font-size: 15px;
        }
      }
      .post-bottom-right {
        .commentText {
          cursor: pointer;
          border-bottom: 1px dashed grey;
          font-size: 15px;
        }
      }
    }
  }
`;

export default Post;
