import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

//firebase----
import firebase from 'firebase/compat/app';
const firebaseConfig = {
  apiKey: 'AIzaSyCv2IfA_ALF7SztABrVAGRTOFl3qPyaHZc',
  authDomain: 'attendance-projec.firebaseapp.com',
  projectId: 'attendance-projec',
  storageBucket: 'attendance-projec.appspot.com',
  messagingSenderId: '905605930003',
  appId: '1:905605930003:web:3cef638092ce5bc7a9f3e6',
  measurementId: 'G-P4VH4G2MEJ',
};
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
