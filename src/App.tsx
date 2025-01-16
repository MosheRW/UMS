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
// import { basePath } from './api/urls';

const basePath = "";

export default function App() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [homePage, setHomePage] = React.useState(basePath);

  useEffect(() => {
    console.log('hight: ', window.innerHeight);
    console.log('Width: ', window.innerWidth);

  }, [])

  useEffect(() => {
    api.getAllUsers(false).then((data) => {
      const token = localStorage.getItem("userToken");
      if (data) {
        if (token && token.length > 0) {
          store.dispatch(setUserToken(token));
          setHomePage(basePath + "/dashboard");
        }
      } else if (token) {
        localStorage.removeItem("userToken");
        setHomePage(basePath + "/login");
      } else {
        setHomePage(basePath + "/login");
      }

    }
    );
  }, []);


  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Provider store={store}>
        <GlobalStyle />
        <ToastContainer />
        <Router homePage={homePage} />
      </Provider>
    </ThemeProvider>

  );
}


