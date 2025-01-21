import styled, { css, createGlobalStyle, RuleSet } from 'styled-components';
export enum Version {
  chosen = 'chosen',
  notChosen = 'notChosen',
  unChosable = 'unChosable',
}
interface SubComponentTheme {
  color: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}
interface ComponentTheme {
  chosen: SubComponentTheme;
  notChosen: SubComponentTheme;
  unChosable: SubComponentTheme;
}
interface Theme {
  backgroundColor: string;

  primaryComponent: ComponentTheme;
  secondaryComponentV1: ComponentTheme;
  secondaryComponentV2: ComponentTheme;

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
  backgroundColor: '#FFFFFF', // General background color for light mode

  primaryComponent: {
    unChosable: {
      color: '#2196F3', // Blue 500
      backgroundColor: '#E3F2FD', // Light Blue 100
      textColor: '#0D47A1', // Blue 900
      borderColor: '#BBDEFB', // Light Blue 200
    },
    chosen: {
      color: '#1565C0', // Blue 800
      backgroundColor: '#BBDEFB', // Light Blue 200
      textColor: '#0D47A1', // Blue 900
      borderColor: '#2196F3', // Blue 500
    },
    notChosen: {
      color: '#64B5F6', // Blue 400
      backgroundColor: '#E3F2FD', // Light Blue 100
      textColor: '#0D47A1', // Blue 900
      borderColor: '#BBDEFB', // Light Blue 200
    },
  },
  secondaryComponentV1: {
    unChosable: {
      color: '#FF9800', // Orange 500
      backgroundColor: '#FFE0B2', // Orange 100
      textColor: '#BF360C', // Orange 900
      borderColor: '#FFCC80', // Orange 200
    },
    chosen: {
      color: '#F57C00', // Orange 700
      backgroundColor: '#FFCC80', // Orange 200
      textColor: '#BF360C', // Orange 900
      borderColor: '#FF9800', // Orange 500
    },
    notChosen: {
      color: '#FFB74D', // Orange 300
      backgroundColor: '#FFE0B2', // Orange 100
      textColor: '#BF360C', // Orange 900
      borderColor: '#FFCC80', // Orange 200
    },
  },

  secondaryComponentV2: {
    unChosable: {
      color: '#4CAF50', // Green 500
      backgroundColor: '#C8E6C9', // Green 100
      textColor: '#1B5E20', // Green 900
      borderColor: '#A5D6A7', // Green 200
    },
    chosen: {
      color: '#388E3C', // Green 700
      backgroundColor: '#A5D6A7', // Green 200
      textColor: '#1B5E20', // Green 900
      borderColor: '#4CAF50', // Green 500
    },
    notChosen: {
      color: '#81C784', // Green 300
      backgroundColor: '#C8E6C9', // Green 100
      textColor: '#1B5E20', // Green 900
      borderColor: '#A5D6A7', // Green 200
    },
  },

  primaryTextFont: "'Roboto', sans-serif",
  secondaryTextFont: "'Roboto', sans-serif",
  thirdTextFont: "'Roboto', sans-serif",

  primaryTextSize: '16px',
  secondaryTextSize: '14px',
  thirdTextSize: '12px',

  borderRadius: '8px',
  borderWidth: '1px',
  borderColor: '#E0E0E0', // Light Gray 300
  alignText: 'left',
};

export const darkTheme: Theme = {
  backgroundColor: '#121212', // General background color for dark mode

  primaryComponent: {
    unChosable: {
      color: '#BBDEFB', // Light Blue 200
      backgroundColor: '#1E88E5', // Blue 600
      textColor: '#FFFFFF', // White
      borderColor: '#1565C0', // Blue 800
    },
    chosen: {
      color: '#64B5F6', // Blue 400
      backgroundColor: '#1565C0', // Blue 800
      textColor: '#FFFFFF', // White
      borderColor: '#BBDEFB', // Light Blue 200
    },
    notChosen: {
      color: '#90CAF9', // Blue 300
      backgroundColor: '#1E88E5', // Blue 600
      textColor: '#FFFFFF', // White
      borderColor: '#1565C0', // Blue 800
    },
  },

  secondaryComponentV1: {
    unChosable: {
      color: '#FFCC80', // Orange 200
      backgroundColor: '#F57C00', // Orange 700
      textColor: '#FFFFFF', // White
      borderColor: '#BF360C', // Orange 900
    },
    chosen: {
      color: '#FFE0B2', // Orange 100
      backgroundColor: '#BF360C', // Orange 900
      textColor: '#FFFFFF', // White
      borderColor: '#FFCC80', // Orange 200
    },
    notChosen: {
      color: '#FFB74D', // Orange 300
      backgroundColor: '#F57C00', // Orange 700
      textColor: '#FFFFFF', // White
      borderColor: '#BF360C', // Orange 900
    },
  },

  secondaryComponentV2: {
    unChosable: {
      color: '#A5D6A7', // Green 200
      backgroundColor: '#388E3C', // Green 700
      textColor: '#FFFFFF', // White
      borderColor: '#1B5E20', // Green 900
    },
    chosen: {
      color: '#C8E6C9', // Green 100
      backgroundColor: '#1B5E20', // Green 900
      textColor: '#FFFFFF', // White
      borderColor: '#A5D6A7', // Green 200
    },
    notChosen: {
      color: '#81C784', // Green 300
      backgroundColor: '#388E3C', // Green 700
      textColor: '#FFFFFF', // White
      borderColor: '#1B5E20', // Green 900
    },
  },

  primaryTextFont: "'Roboto', sans-serif",
  secondaryTextFont: "'Roboto', sans-serif",
  thirdTextFont: "'Roboto', sans-serif",

  primaryTextSize: '16px',
  secondaryTextSize: '14px',
  thirdTextSize: '12px',

  borderRadius: '8px',
  borderWidth: '1px',
  borderColor: '#424242', // Dark Gray 700
  alignText: 'left',
};

export const PrimaryComponent = css<{ $version: Version }>`
  color: ${({ theme }) =>
    (props) =>
      theme.primaryComponent[props.$version].color};
  background-color: ${({ theme }) =>
    (props) =>
      theme.primaryComponent[props.$version].backgroundColor};
  border-color: ${({ theme }) =>
    (props) =>
      theme.primaryComponent[props.$version].borderColor};
`;

export const Buttons = css`
  width: 90%;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.primaryComponent.unChosable.borderColor};
  padding: 0.5rem;
  margin: 0.5rem;
  cursor: pointer;
  text-align: center;

  background-color: ${({ theme }) => theme.primaryComponent.unChosable.backgroundColor};
  color: ${({ theme }) => theme.primaryComponent.unChosable.color};

  &:hover {
    background-color: ${({ theme }) => theme.primaryComponent.notChosen.backgroundColor};
    color: ${({ theme }) => theme.primaryComponent.notChosen.color};
    border-color: ${({ theme }) => theme.primaryComponent.notChosen.borderColor};
    transform: scale(0.95);
  }

  &:active {
    transform: scale(1.05);
    border: 1px solid ${({ theme }) => theme.primaryComponent.chosen.borderColor};
    background-color: ${({ theme }) => theme.primaryComponent.chosen.backgroundColor};
    color: ${({ theme }) => theme.primaryComponent.chosen.color};
  }
`;

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.backgroundColor};
  };
  h1 {
    color: ${({ theme }) => theme.primaryComponent.chosen.textColor};
  };
`;

const Input = css`
  background-color: ${({ theme }) => theme.primaryComponent.notChosen.backgroundColor};
  color: ${({ theme }) => theme.primaryComponent.notChosen.textColor};
  border: 1px solid;
  border-color: ${({ theme }) => theme.primaryComponent.notChosen.borderColor};
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 90%;
  height: 1rem;
  padding-bottom: 0.5rem;

  &::placeholder {
    color: ${({ theme }) => theme.primaryComponent.notChosen.textColor};
  }

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
  color: ${({ theme }) => theme.primaryComponent.notChosen.textColor};
`;

export const ErrorMessege = styled.p`
  text-align: center;
  padding-top: 2%;
  color: red;
  height: 1rem;
  width: 90%;
`;

export const Select = styled.select`
  background-color: ${({ theme }) => theme.primaryComponent.unChosable.backgroundColor};
  color: ${({ theme }) => theme.primaryComponent.notChosen.textColor};
  border: 1px solid ${({ theme }) => theme.primaryComponent.chosen.borderColor};

  border-radius: 0.5rem;

  min-width: 15ch;
  width: 50%;
  padding: 0.5rem;
`;
