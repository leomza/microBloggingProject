import './App.css';
import React, { useState, useEffect } from 'react';
import TweetsList from './components/TweetsList';
import AddNewTweet from './components/AddNewTweet';
import getTweets from './services/getTweets';
import { Route, Switch, Link } from 'react-router-dom';
import ProfileForm from './components/ProfileForm';

function App() {
  //All the tweets:
  const [allTweets, setAllTweets] = useState([]);
  //Contains the userName profile
  const [userName, setUserName] = useState('IronMan2');

  useEffect(() => {
    //Call the function in the services call "getTweets()" and assign the return to setAllTweets
    getTweets().then(tweets => setAllTweets(tweets))
  }, [allTweets])

  //Function to sort the Tweets by created date
  const sortTweetsByCreatedDate = () => {
    allTweets.sort((a, b) => b.date - a.date)
  }
  sortTweetsByCreatedDate()

  //Set the userName from the profile page
  const changeUserName = (userName) => {
    setUserName(userName)
  }
  console.log("pepe");

  return (
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
            <AddNewTweet {...{ userName }} />
            <TweetsList {...{ allTweets }} />
          </div>
        </Route>
        <Route path='/profile'>
          <ProfileForm {...{ userName, changeUserName }} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
