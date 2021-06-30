import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./feed-components/Post";
import Share from "./feed-components/Share";
import axios from "axios";
import { useGlobalContext } from "../Context/AuthContext";

const Feeds = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useGlobalContext();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${user._id}`);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <FeedsStyled>
      <div className="feed-wrapper">
        {(username === user.username || username === undefined) && <Share />}
        {posts.map((p) => {
          return <Post key={p._id} post={p} />;
        })}
      </div>
    </FeedsStyled>
  );
};

const FeedsStyled = styled.div`
  flex: 5.5;
  .feed-wrapper {
    padding: 20px;
  }
`;
export default Feeds;
