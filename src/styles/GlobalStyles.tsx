import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Raleway', sans-serif;
    background: linear-gradient(135deg, #f8f8f8, #e8e8e8);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    color: #333;
  }

  .fade {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .fade.active {
    opacity: 1;
  }
`;

export default GlobalStyle;