import React from "react";
import styled, { keyframes } from "styled-components";

const Loading: React.FC = () => {
  return (
    <Wrapper>
      <LoadingBar>
        <LoadingFirstBar />
        <LoadingSecondBar />
        <LoadingThirdBar />
      </LoadingBar>
    </Wrapper>
  );
};

export default Loading;

const Wrapper = styled.section`
  ${{
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0
  }}
`;

const bounceBar = keyframes`
 0% {
  height: 10px;
 }
 100% {
  height: 50px;
 }
`;

const LoadingBar = styled.div`
  ${{
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end"
  }}
`;

const LoadingFirstBar = styled.div`
${{
  width: "10px",
  height: "7px",
  background: "#FFF",
  borderRadius: "5px"
}}
animation: ${bounceBar} 500ms ease 0ms infinite alternate;
`;

const LoadingSecondBar = styled.div`
${{
  width: "10px",
  height: "7px",
  background: "#FFF",
  borderRadius: "5px"
}}
animation: ${bounceBar} 500ms ease 100ms infinite alternate;
`;

const LoadingThirdBar = styled.div`
${{
  width: "10px",
  height: "7px",
  background: "#FFF",
  borderRadius: "5px"
}}
animation: ${bounceBar} 500ms ease 200ms infinite alternate;
`;
