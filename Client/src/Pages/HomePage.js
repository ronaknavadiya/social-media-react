import React from "react";
import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import Toolbar from "../Components/Toolbar";
import Feeds from "../Components/Feeds";
import Rightbar from "../Components/Rightbar";

const HomePage = () => {
  return (
    <React.Fragment>
      <Toolbar />
      <HomepageStyled>
        <Sidebar />
        <Feeds />
        <Rightbar />
      </HomepageStyled>
    </React.Fragment>
  );
};

const HomepageStyled = styled.div`
  display: flex;
  width: 100%;
`;
export default HomePage;
