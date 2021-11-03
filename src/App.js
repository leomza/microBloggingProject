import './App.css';
import React from 'react';
import TweetsList from './components/TweetsList';
import AddNewTweet from './components/AddNewTweet';
import { Route, Switch, Link } from 'react-router-dom';
import ProfileForm from './components/ProfileForm';
import InfoTweetsProvider from './context/InfoTweetsContext'
import InfoUserNameProvider from './context/InfoUserNameContext';

/* Hosting URL: https://microblogtwitter.web.app */

function App() {
  return (
    <InfoUserNameProvider>
      <InfoTweetsProvider>
        <div>
          <nav className="navBar">
            <ul className="navBar__list">
              <li className="navBar__link--content">
                <Link className="navBar__link" to='/'>Home</Link>
              </li>
              <li className="navBar__link--content">
                <Link className="navBar__link" to='/profile'>Profile</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path='/' exact>
              <div>
                <AddNewTweet />
                <TweetsList />
              </div>
            </Route>
            <Route path='/profile'>
              <ProfileForm />
            </Route>
          </Switch>
        </div>
      </InfoTweetsProvider>
    </InfoUserNameProvider>
  );
}

export default App;
