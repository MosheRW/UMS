import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './style/themes.style';
import Router from './pages/router';
import { Provider } from 'react-redux';
import store from './redux/store';
import { setUserToken } from './redux/features/userData/userDataSlice';
import { ToastContainer } from 'react-toastify';
import { api } from './api/api';


export default function App() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  useEffect(() => {
    api.getAllUsers().then((data) => {
      if (data) {
        const token = localStorage.getItem("userToken");
        if (token && token.length > 0) {
          store.dispatch(setUserToken(token));
        }
      } else {
        localStorage.removeItem("userToken");
      }
    });
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Provider store={store}>
        <ToastContainer />
        <Router />
      </Provider>
    </ThemeProvider>

  );
}


