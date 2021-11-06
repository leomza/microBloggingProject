import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import FirebaseProvider from './config/Firebase'
import AuthProvider from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <FirebaseProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </FirebaseProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);