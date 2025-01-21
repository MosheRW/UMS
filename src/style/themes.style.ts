import styled, { css, createGlobalStyle } from 'styled-components';

interface Theme {
  backgroundColor: string;

  firstComponentsColor: string;
  secondComponentsColor: string;
  thirdComponentsColor: string;

  firstComponentsColorTransperent: string;
  secondComponentsColorTransperent: string;
  thirdComponentsColorTransperent: string;

  frameColor: string;

  primaryTextColor: string;
  secondaryTextColor: string;
  thirdTextColor: string;

  primaryTextFont: string;
  secondaryTextFont: string;
  thirdTextFont: string;

  primaryTextSize: string;
  secondaryTextSize: string;
  thirdTextSize: string;

  borderRadius: string; 
  borderWidth: string; 
  borderColor: string; 
  alignText: string;
}

export const Hovering = css``;
export const Clicking = css``;

export const lightTheme: Theme = {
  backgroundColor: "#FFFFFF", // Pure white background

  firstComponentsColor: "#FFCDD2", // Red 100
  secondComponentsColor: "#F8BBD0", // Pink 100
  thirdComponentsColor: "#E1BEE7", // Purple 100

  firstComponentsColorTransperent: "rgba(255, 205, 210, 0.5)", // Red 100 (50% opacity)
  secondComponentsColorTransperent: "rgba(248, 187, 208, 0.5)", // Pink 100 (50% opacity)
  thirdComponentsColorTransperent: "rgba(225, 190, 231, 0.5)", // Purple 100 (50% opacity)

  frameColor: "#CFD8DC", // Blue Grey 200

  primaryTextColor: "#212121", // Grey 900 for main text
  secondaryTextColor: "#616161", // Grey 700 for secondary text
  thirdTextColor: "#9E9E9E", // Grey 500 for subtle text

  primaryTextFont: "'Roboto', sans-serif",
  secondaryTextFont: "'Roboto', sans-serif",
  thirdTextFont: "'Roboto', sans-serif",

  primaryTextSize: "18px", // Larger size for main text
  secondaryTextSize: "16px",
  thirdTextSize: "14px",

  borderRadius: "10px", // Slightly rounded corners
  borderWidth: "1.5px", // Thicker for clarity
  borderColor: "#B0BEC5", // Blue Grey 300 for borders
  alignText: "left",
};

export const darkTheme: Theme = {
  backgroundColor: "#121212", // Deep black background

  firstComponentsColor: "#EF5350", // Red 400
  secondComponentsColor: "#AB47BC", // Purple 400
  thirdComponentsColor: "#42A5F5", // Blue 400

  firstComponentsColorTransperent: "rgba(239, 83, 80, 0.5)", // Red 400 (50% opacity)
  secondComponentsColorTransperent: "rgba(171, 71, 188, 0.5)", // Purple 400 (50% opacity)
  thirdComponentsColorTransperent: "rgba(66, 165, 245, 0.5)", // Blue 400 (50% opacity)

  frameColor: "#37474F", // Blue Grey 800

  primaryTextColor: "#E0E0E0", // Grey 300 for light text
  secondaryTextColor: "#B0BEC5", // Blue Grey 400 for secondary text
  thirdTextColor: "#78909C", // Blue Grey 500 for subtle text

  primaryTextFont: "'Roboto', sans-serif",
  secondaryTextFont: "'Roboto', sans-serif",
  thirdTextFont: "'Roboto', sans-serif",

  primaryTextSize: "18px", // Larger size for main text
  secondaryTextSize: "16px",
  thirdTextSize: "14px",

  borderRadius: "10px", // Slightly rounded corners
  borderWidth: "1.5px", // Thicker for clarity
  borderColor: "#546E7A", // Blue Grey 700 for borders
  alignText: "left",
};


export const Buttons = css`
  width: 90%;
  border-radius: 0.5rem;
  border: 1px solid black;
  padding: 0.5rem;
  margin: 0.5rem;
  cursor: pointer;
  text-align: center;
  background-color: ${({ theme }) => theme.thirdComponentsColorTransperent};
  color: ${({ theme }) => theme.primaryTextColor};
`;

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.backgroundColor};
  };
  h1 {
    color: ${({ theme }) => theme.primaryTextColor};
  };
  .tooltip {
    background-color: black;
  }

`;

const Input = css`
  background-color: ${({ theme }) => theme.secondComponentsColorTransperent};
  color: ${({ theme }) => theme.primaryTextColor};
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 90%;
  height: 1rem;
  padding-bottom: 0.5rem;

  @media (max-width: 1300px) {
    ${(props) => (window.innerWidth * 1 < window.innerHeight * 1 ? `width: 90%` : 'width: 20ch')};
  }
`;

export const InputText = styled.input.attrs({ type: 'text' })`
  ${Input}
`;

export const InputEmail = styled.input.attrs({ type: 'email' })`
  ${Input}
`;

export const InputPassword = styled.input.attrs({ type: 'password' })`
  ${Input}
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.primaryTextColor};
`;

export const ErrorMessege = styled.p`
  text-align: center;
  padding-top: 2%;
  color: red;
  height: 1rem;
  width: 90%;
`;

export const Select = styled.select`
  min-width: 15ch;
  width: 50%;
  background-color: ${({ theme }) => theme.secondComponentsColorTransperent};
  padding: 0.5rem;
`;
