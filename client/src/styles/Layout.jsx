import styled from "styled-components";

export const InnerLayOut = styled.div`
  background: #fcf6f9c1;
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  height: 85vh;
  overflow: auto;
  margin-left: 2rem;
  padding: 1.5rem 2rem;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
