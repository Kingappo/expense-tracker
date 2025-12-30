import React from "react";
import Profile from "../components/Profile";
import { InnerLayOut } from "../styles/Layout";
import styled from "styled-components";

const AccountStyled = styled.div`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
  }
`;

const Account = () => {
  return (
    <AccountStyled>
      <InnerLayOut>
        <div className="container">
          <Profile />
        </div>
      </InnerLayOut>
    </AccountStyled>
  );
};

export default Account;
