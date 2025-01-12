import styled, { css } from 'styled-components';

interface Theme {
    backgroundColor: string;

    firstComponentsColor: string;
    secondComponentsColor: string;
    thirdComponentsColor: string;

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
};

export const Hovering = css``;
export const Clicking = css``;

export const lightTheme: Theme = {
    backgroundColor: '#ffffff', // White background for light mode

    firstComponentsColor: '#007BFF', // Blue for buttons/primary components
    secondComponentsColor: '#6c757d', // Gray for secondary components
    thirdComponentsColor: '#28a745', // Green for positive action items

    frameColor: '#e0e0e0', // Light gray for borders and frames

    primaryTextColor: '#212529', // Dark text for readability
    secondaryTextColor: '#6c757d', // Medium gray for secondary text
    thirdTextColor: '#28a745', // Green for highlighting

    primaryTextFont: 'Arial, sans-serif', // Common sans-serif font
    secondaryTextFont: 'Verdana, sans-serif', // Another sans-serif for distinction
    thirdTextFont: 'Courier New, monospace', // Monospaced for special text like code

    primaryTextSize: '16px', // Standard text size
    secondaryTextSize: '14px', // Smaller text for secondary items
    thirdTextSize: '12px' // Small text for tertiary information
};

export const darkTheme: Theme = {
    backgroundColor: '#121212', // Dark background for dark mode

    firstComponentsColor: '#6200ea', // Purple for primary components in dark mode
    secondComponentsColor: '#bb86fc', // Light purple for secondary components
    thirdComponentsColor: '#03dac6', // Cyan for positive actions in dark mode

    frameColor: '#333333', // Dark gray for borders and frames

    primaryTextColor: '#e0e0e0', // Light text for dark backgrounds
    secondaryTextColor: '#9e9e9e', // Medium gray for secondary text
    thirdTextColor: '#03dac6', // Cyan for highlighting

    primaryTextFont: 'Roboto, sans-serif', // Common Google font for readability
    secondaryTextFont: 'Arial, sans-serif', // Alternative sans-serif font
    thirdTextFont: 'Courier New, monospace', // Monospaced for special text like code

    primaryTextSize: '16px', // Standard text size
    secondaryTextSize: '14px', // Smaller text for secondary items
    thirdTextSize: '12px' // Small text for tertiary information
};
