import './App.css';
import React, { useEffect, useContext } from 'react';
import InfoTweetsProvider from './context/InfoTweetsContext'
import InfoUserNameProvider from './context/InfoUserNameContext';
import NavBar from './components/NavBar'
import Login from './components/Login';
import { AuthContext } from './context/AuthContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";

/* Hosting URL: https://microblogtwitter.web.app */

function App() {

  //Extract from the provider the information:
  const { authInfo, login } = useContext(AuthContext)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user)
        login({ name: user.displayName, email: user.email })
      else {
      }
    });
  }, [])

  return (
    <InfoUserNameProvider>
      <InfoTweetsProvider>
        {!authInfo && <Login />}
        {authInfo && <NavBar />}
      </InfoTweetsProvider>
    </InfoUserNameProvider>
  );
}

export default App;
