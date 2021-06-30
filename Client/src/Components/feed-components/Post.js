import { MoreVert } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Context/AuthContext";

const Post = ({ post }) => {
  const userId = post.userId;
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [isComment, setIsComment] = useState(false);
  const commentText = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    setIsLiked(post.likes.includes(userId));
  }, [setIsLiked]);

  const likeHandler = async () => {
    try {
      await axios.put(`/posts/${post._id}/like`, {
        userId: userId,
      });
      setLikeCount(post.likes.length);
    } catch (error) {
      console.log(error);
    }
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
  };

  const handleComments = () => {
    setIsComment(!isComment);
  };

  const sendComment = async () => {
    const comment = commentText.current.value;
    try {
      const yourComment = {
        postId: post._id,
        userId: user._id,
        username: user.username,
        message: comment,
        img: user.profilePicture,
        time: new Date(),
      };
      await axios.put(`/posts/${post._id}/comment`, {
        comments: yourComment,
      });
      window.alert("You have commented successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostStyled>
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.profilePicture || public_folder + "noAvatar.png"}
                alt="user-profile-pic"
              />
            </Link>
            <div className="name-and-time">
              <span className="post-username">{user.username}</span>
              <div className="post-date">{format(post.createdAt)}</div>
            </div>
          </div>
          <div className="post-top-right">
            <MoreVert />
          </div>
        </div>
        <div className="post-center">
          <span className="post-desc">{post?.desc}</span>
          <hr />
          {post.img && <img src={post.img} alt="post-img" />}
        </div>
        <div className="post-bottom">
          <div className="post-bottom-top">
            <div className="post-bottom-left">
              {/* <img
              src={public_folder + `like.png`}
              alt="like button"
              onClick={likeHandler}
            /> */}
              <img
                src={public_folder + `heart.png`}
                alt="heart button"
                onClick={likeHandler}
              />
              <span className="likeCount">{likeCount}</span>
              <img
                src={public_folder + `message.png`}
                alt="message button"
                onClick={handleComments}
              />
            </div>
            <div className="post-bottom-right">
              <span className="commentText">
                {post.comments ? post.comments.length : ""} Comments
              </span>
            </div>
          </div>
          {isComment && (
            <div className="comment-section">
              <div className="post-bottom-down">
                <input type="text" ref={commentText} />
                <button className="comment-button" onClick={sendComment}>
                  Comment
                </button>
              </div>

              {post.comments.map((comment) => {
                return (
                  <div className="friends-comments">
                    <div className="comment-left">
                      <Link to={`/profile/${comment.username}`}>
                        <img
                          src={comment.img || public_folder + "noAvatar.png"}
                          alt="user-profile-pic"
                        />
                      </Link>
                      <div className="name-and-time">
                        <div className="name-text">
                          <span className="comment-username">
                            {comment.username} :
                          </span>
                          <span className="comment-text">
                            {comment.message}
                          </span>
                        </div>
                        <div className="comment-date">
                          {format(comment.time)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PostStyled>
  );
};

const PostStyled = styled.div`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 1px 6px 10px 6px #cab2d6;
  box-shadow: 1px 6px 10px 6px #cab2d6;
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
      hr {
        opacity: 0.5;
        margin-top: 5px;
      }
      img {
        width: 100%;
        margin-top: 20px;
        max-height: 500px;
        object-fit: contain;
      }
    }
    .post-bottom {
      /* display: flex;
      align-items: center;
      justify-content: space-between; */
      .post-bottom-top {
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
            margin-left: 10px;
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
      .comment-section {
        .post-bottom-down {
          margin-top: 10px;
          display: flex;
          input {
            width: 95%;
            border: 1px solid var(--border-color);
            border-radius: 5px;
            font-size: 15px;
            padding: 5px;
          }
          input:focus {
            outline: none;
          }
          .comment-button {
            border: none;
            padding: 7px 12px;
            border-radius: 5px;
            background-color: var(--border-color);
            color: white;
            font-weight: 500;
            cursor: pointer;
          }
        }
        .friends-comments {
          margin-top: 10px;
          .comment-left {
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
              width: 100%;
              border: 1px solid var(--border-color);
              border-radius: 5px;

              .name-text {
                width: 100%;
                margin: 0 5px;
                .comment-username {
                  font-size: 1.1rem;
                  font-weight: 500;
                }
                .comment-text {
                  margin-left: 10px;
                  font-size: 0.9rem;
                }
              }
              .comment-date {
                font-size: small;
                margin: 0 5px;
                margin-bottom: 3px;
              }
            }
          }
        }
      }
    }
  }
`;

export default Post;
