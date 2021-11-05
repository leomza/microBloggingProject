import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import FirebaseProvider from './config/Firebase'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);