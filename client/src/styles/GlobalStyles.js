import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Nunito, sans-serif;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    color: #22226099;
    transition: all 0.25s linear;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  h1, h2, h3, h4{
    color: #222260;
  }
`;
