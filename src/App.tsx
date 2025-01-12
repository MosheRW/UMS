import React from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './style/themes.style';
import Router from './pages/router';


export default function App() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <Router />
    </ThemeProvider>

  );
}


