import './App.css';
import React, { useState, useEffect } from 'react';
import TweetsList from './components/TweetsList';
import AddNewTweet from './components/AddNewTweet';
import getTweets from './services/getTweets';

function App() {
  //All the tweets:
  const [allTweets, setAllTweets] = useState([]);

  useEffect(() => {
    //Call the function in the services call "getTweets()" and assign the return to setAllTweets
    getTweets().then(tweets => setAllTweets(tweets))
  }, [allTweets])

  //Function to sort the Tweets by crated date
  const sortTweetsByCreatedDate = () => {
    allTweets.sort((a, b) => b.date - a.date)
  }
  sortTweetsByCreatedDate()

  return (
    <div>
      <AddNewTweet />
      <TweetsList {...{ allTweets }} />
    </div>
  );
}

export default App;
