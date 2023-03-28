import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import store from './store/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root Element');
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
