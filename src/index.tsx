import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
