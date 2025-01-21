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
  backgroundColor: "#FFFFFF",

  firstComponentsColor: "#E3F2FD", // Light Blue 100
  secondComponentsColor: "#BBDEFB", // Light Blue 200
  thirdComponentsColor: "#90CAF9", // Light Blue 300

  firstComponentsColorTransperent: "rgba(227, 242, 253, 0.5)",
  secondComponentsColorTransperent: "rgba(187, 222, 251, 0.5)",
  thirdComponentsColorTransperent: "rgba(144, 202, 249, 0.5)",

  frameColor: "#E0E0E0", // Grey 300

  primaryTextColor: "#212121", // Grey 900
  secondaryTextColor: "#757575", // Grey 600
  thirdTextColor: "#9E9E9E", // Grey 500

  primaryTextFont: "'Roboto', sans-serif",
  secondaryTextFont: "'Roboto', sans-serif",
  thirdTextFont: "'Roboto', sans-serif",

  primaryTextSize: "16px",
  secondaryTextSize: "14px",
  thirdTextSize: "12px",

  borderRadius: "8px",
  borderWidth: "1px",
  borderColor: "#E0E0E0", // Grey 300
  alignText: "left",
};

export const darkTheme: Theme = {
  backgroundColor: "#121212",

  firstComponentsColor: "#1E88E5", // Blue 600
  secondComponentsColor: "#1976D2", // Blue 700
  thirdComponentsColor: "#1565C0", // Blue 800

  firstComponentsColorTransperent: "rgba(30, 136, 229, 0.5)",
  secondComponentsColorTransperent: "rgba(25, 118, 210, 0.5)",
  thirdComponentsColorTransperent: "rgba(21, 101, 192, 0.5)",

  frameColor: "#424242", // Grey 800

  primaryTextColor: "#FFFFFF", // White
  secondaryTextColor: "#BDBDBD", // Grey 400
  thirdTextColor: "#757575", // Grey 600

  primaryTextFont: "'Roboto', sans-serif",
  secondaryTextFont: "'Roboto', sans-serif",
  thirdTextFont: "'Roboto', sans-serif",

  primaryTextSize: "16px",
  secondaryTextSize: "14px",
  thirdTextSize: "12px",

  borderRadius: "8px",
  borderWidth: "1px",
  borderColor: "#424242", // Grey 800
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
