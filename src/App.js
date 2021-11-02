import './App.css';
import React, { useState, useEffect } from 'react';
import TweetsList from './components/TweetsList';
import shortid from 'shortid';
import AddNewTweet from './components/AddNewTweet';
import * as localForage from "localforage";

function App() {
  //All the tweets:
  const [allTweets, setAllTweets] = useState([]);

  //Save the information in localForage when the state of "allTweets"
  useEffect(() => {
    const saveTweetsList = async () => {
      await localForage.setItem('tweets', allTweets);
    }
    saveTweetsList()
  }, [allTweets]);

  //Get the information from localForage when I initialite the App
  useEffect(() => {
    const getTweetsList = async () => {
      const tweetsListFromForage = await localForage.getItem('tweets');
      if (tweetsListFromForage) {
        setAllTweets(tweetsListFromForage)
      }
    }
    getTweetsList()
  }, []);

  const addTweet = (newTweet) => {
    //Copy the old array of tweets and add the tweet that I recieve from the Add Tweet Component with an Id and a created date
    setAllTweets([...allTweets, { ...newTweet, key: shortid.generate(), date: new Date() }]);
  }

  //Function to sort the Tweets by crated date
  const sortTweetsByCreatedDate = () => {
    allTweets.sort((a, b) => b.date - a.date)
  }
  sortTweetsByCreatedDate()

  return (
    <div>
      <AddNewTweet {...{ addTweet }} />
      <TweetsList {...{ allTweets }} />
    </div>
  );
}

export default App;
