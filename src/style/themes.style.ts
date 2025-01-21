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

  firstComponentsColor: "#E3F2FD", // Light Blue 100
  secondComponentsColor: "#64B5F6", // Light Blue 400
  thirdComponentsColor: "#0D47A1", // Blue 900   "#1E88E5", // Blue 600

  firstComponentsColorTransperent: "rgba(227, 242, 253, 0.5)", // Light Blue 100 (50% opacity)
  secondComponentsColorTransperent: "rgba(100, 181, 246, 0.5)", // Light Blue 400 (50% opacity)
  thirdComponentsColorTransperent: "rgba(30, 136, 229, 0.5)", // Blue 600 (50% opacity)

  frameColor: "#B0BEC5", // Blue Grey 300

  primaryTextColor: "#212121", // Grey 900
  secondaryTextColor: "#616161", // Grey 700
  thirdTextColor: "#9E9E9E", // Grey 500

  primaryTextFont: "'Roboto', sans-serif",
  secondaryTextFont: "'Roboto', sans-serif",
  thirdTextFont: "'Roboto', sans-serif",

  primaryTextSize: "16px",
  secondaryTextSize: "14px",
  thirdTextSize: "12px",

  borderRadius: "8px", // Rounded corners for a modern look
  borderWidth: "1px",
  borderColor: "#E0E0E0", // Grey 300
  alignText: "left",
};


export const darkTheme: Theme = {
  backgroundColor: "#121212", // Deep black background

  firstComponentsColor: "#1E88E5", // Blue 600
  secondComponentsColor: "#1565C0", // Blue 800
  thirdComponentsColor: "#0D47A1", // Blue 900

  firstComponentsColorTransperent: "rgba(30, 136, 229, 0.5)", // Blue 600 (50% opacity)
  secondComponentsColorTransperent: "rgba(21, 101, 192, 0.5)", // Blue 800 (50% opacity)
  thirdComponentsColorTransperent: "rgba(13, 71, 161, 0.5)", // Blue 900 (50% opacity)

  frameColor: "#37474F", // Blue Grey 800

  primaryTextColor: "#E0E0E0", // Grey 300 for main text
  secondaryTextColor: "#B0BEC5", // Blue Grey 400 for secondary text
  thirdTextColor: "#78909C", // Blue Grey 500 for subtle text

  primaryTextFont: "'Roboto', sans-serif",
  secondaryTextFont: "'Roboto', sans-serif",
  thirdTextFont: "'Roboto', sans-serif",

  primaryTextSize: "16px",
  secondaryTextSize: "14px",
  thirdTextSize: "12px",

  borderRadius: "8px", // Rounded corners
  borderWidth: "1px",
  borderColor: "#424242", // Grey 800
  alignText: "left",
};

/**
 * backround color
 * color
 * text color
 * border color
 */

// primary
// seconderyComponentV1
// seconderyComponentV1 - chosen
// seconderyComponentV2
// seconderyComponentV2 - chosen




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
