import React from "react";
import styled from "styled-components";

const Menu: React.FC = () => {
  return (
    <Entire>
      <LogoWrapper>
        <img src="/logo.png" />
      </LogoWrapper>
    </Entire>
  );
};

export default Menu;

const Entire = styled.nav`
  width: 121px;
  height: 100vh;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const LogoWrapper = styled.figure`
  width: 66px;
  height: 66px;
`;
