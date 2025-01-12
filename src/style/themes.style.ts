import styled, { css } from 'styled-components';


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

    borderRadius: string; // Border radius for rounded corners
    borderWidth: string; // Border width for components
    borderColor: string; // Border color for components
    alignText: string;
};

export const Hovering = css``;
export const Clicking = css``;

export const lightTheme: Theme = {
    backgroundColor: '#ffffff',

    firstComponentsColor: 'rgba(0, 123, 255, 1)',    // Semi-transparent blue
    secondComponentsColor: 'rgba(108, 117, 125, 1)', // Semi-transparent gray
    thirdComponentsColor: 'rgba(40, 167, 69, 1)',    // Semi-transparent green

    firstComponentsColorTransperent: 'rgba(0, 123, 255, 0.5)',    // Semi-transparent blue
    secondComponentsColorTransperent: 'rgba(108, 117, 125, 0.5)', // Semi-transparent gray
    thirdComponentsColorTransperent: 'rgba(40, 167, 69, 0.5)',    // Semi-transparent green
    

    frameColor: '#e0e0e0',

    primaryTextColor: '#212529',
    secondaryTextColor: '#6c757d',
    thirdTextColor: '#28a745',

    primaryTextFont: 'Arial, sans-serif',
    secondaryTextFont: 'Verdana, sans-serif',
    thirdTextFont: 'Courier New, monospace',

    primaryTextSize: '16px',
    secondaryTextSize: '14px',
    thirdTextSize: '12px',

    borderRadius: '8px', 
    borderWidth: '1px',
    borderColor: '#cccccc',

    alignText: 'left',
};

export const darkTheme: Theme = {
    backgroundColor: '#121212',

    firstComponentsColor: '#6200ea',
    secondComponentsColor: '#bb86fc',
    thirdComponentsColor: '#03dac6',

    firstComponentsColorTransperent: '#6200ea',
    secondComponentsColorTransperent: '#bb86fc',
    thirdComponentsColorTransperent: '#03dac6',

    frameColor: '#333333',

    primaryTextColor: '#e0e0e0',
    secondaryTextColor: '#9e9e9e',
    thirdTextColor: '#03dac6',

    primaryTextFont: 'Roboto, sans-serif',
    secondaryTextFont: 'Arial, sans-serif',
    thirdTextFont: 'Courier New, monospace',

    primaryTextSize: '16px',
    secondaryTextSize: '14px',
    thirdTextSize: '12px',

    borderRadius: '8px', // Rounded corners for dark theme
    borderWidth: '1px', // Standard border width
    borderColor: '#555555', // Dark gray borders for the dark theme
    alignText: 'left',

};


