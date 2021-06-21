import React from "react";
import styled from "styled-components";
import Post from "./feed-components/Post";
import Share from "./feed-components/Share";
import { Posts } from "../tempData";

const Feeds = () => {
  return (
    <FeedsStyled>
      <div className="feed-wrapper">
        <Share />
        {Posts.map((p) => {
          return <Post key={p.id} post={p} />;
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
