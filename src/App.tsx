import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, GlobalStyle, lightTheme } from './style/themes.style';
import Router from './pages/router';
import { Provider } from 'react-redux';
import store from './redux/store';
import { setUserToken } from './redux/features/userData/userDataSlice';
import { ToastContainer } from 'react-toastify';
import { api } from './api/api';
import { Navigate, useNavigate } from 'react-router';


export default function App() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  useEffect(() => {
    api.getAllUsers(false).then((data) => {
      const token = localStorage.getItem("userToken");
      if (data) {
        if (token && token.length > 0) {
          store.dispatch(setUserToken(token));
        }
      } else if (token) {
        store.dispatch(setUserToken(token));
      }
    });
  }, []);



  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <ToastContainer />
      <Router />
    </ThemeProvider>

  );
}


