import axios from "axios";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../Context/AuthContext";

const EditPost = ({ setEdit, postId, uid }) => {
  const [deletebtn, setDeletebtn] = useState(false);
  const [editbtn, setEditbtn] = useState(false);
  const { user } = useGlobalContext();
  const edittext = useRef();

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(`/posts/${postId}`, {
        data: { userId: user._id },
      });
      window.alert("Yuur post has been deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = async () => {
    const text = edittext.current.value;
    try {
      await axios.put(`/posts/${postId}`, { userId: user._id, desc: text });
      window.alert("Yuur post has been Edited successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <EditPostStyled>
      <div className={deletebtn || editbtn ? "hide-content" : "list-container"}>
        <span className="button" onClick={() => setEditbtn(true)}>
          Edit
        </span>
        <hr />
        <span className="button" onClick={() => setDeletebtn(true)}>
          Delete
        </span>
        <hr />
        <span className="button" onClick={() => setEdit(false)}>
          Cancel
        </span>
      </div>

      {deletebtn && (
        <div className="delete-container">
          <h2>DO you really want to delete this post ?</h2>
          <div className="btn-container">
            <button onClick={handleDeletePost}>Delete</button>
            <button
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {editbtn && (
        <div className="delete-container">
          <input
            className="edit-input"
            placeholder="Edit your post description here...."
            ref={edittext}
          />
          <div className="btn-container">
            <button onClick={handleEditPost}>Edit</button>
            <button
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </EditPostStyled>
  );
};

const EditPostStyled = styled.div`
  height: 110px;
  background-color: var(--border-color);
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
  transition: all 0.4s ease-in-out;
  color: white;
  .list-container {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    align-items: center;
    height: inherit;
    justify-content: space-evenly;
    .button {
      cursor: pointer;
      padding: 8px 20px;
      width: 50%;
      text-align: center;
    }
    .button:hover {
      background-color: var(--background-dark-color);
      height: inherit;
    }
    hr {
      width: 80%;
      opacity: 0.3;
    }
  }

  .hide-content {
    display: none;
  }
  .delete-container {
    background-color: white;
    border-radius: 5px;
    border: 2px solid grey;
    position: absolute;
    width: 570px;
    left: -565px;
    padding-top: 10px;
    h2 {
      z-index: 3;
      text-align: center;
      color: black;
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
    .edit-input {
      padding: 10px 10px;
      border: none;
      border-bottom: 1px solid grey;
      width: 90%;
      margin-bottom: 10px;
      font-size: 1.2rem;
    }
    .edit-input:focus {
      outline: none;
    }
    .btn-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      button {
        cursor: pointer;
        padding: 5px 10px;
        text-align: center;
        border-radius: 10px;
        margin-bottom: 5px;
      }
      button:hover {
        background-color: var(--background-dark-color);
        color: white;
      }
    }
  }
`;

export default EditPost;
