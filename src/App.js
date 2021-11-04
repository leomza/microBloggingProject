import './App.css';
import React from 'react';
import InfoTweetsProvider from './context/InfoTweetsContext'
import InfoUserNameProvider from './context/InfoUserNameContext';
import NavBar from './components/NavBar'

/* Hosting URL: https://microblogtwitter.web.app */

function App() {
  return (
    <InfoUserNameProvider>
      <InfoTweetsProvider>
       <NavBar />
      </InfoTweetsProvider>
    </InfoUserNameProvider>
  );
}

export default App;
