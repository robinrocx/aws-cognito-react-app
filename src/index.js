import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'crypto-js/lib-typedarrays';
import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_xBfBGrf8f",
    userPoolWebClientId: "136r9tthnoquqlb8o28p90c748",
  },
});



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
