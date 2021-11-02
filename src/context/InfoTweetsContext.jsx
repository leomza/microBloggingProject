import React, { useState, useEffect, createContext } from 'react'
import getTweets from '../services/getTweets'

//Create the Context
export const InfoTweetsContext = createContext({})

const InfoTweetsProvider = props => {
  //All the tweets:
  const [allTweets, setAllTweets] = useState([])

  useEffect(() => {
    const id = setInterval(() =>
      //Call the function in the services call "getTweets()" and assign the return to setAllTweets
      getTweets().then(tweets => setAllTweets(tweets))
    , 10000);
    return () => clearInterval(id);
  }, [])

  //Function to sort the Tweets by created date
  const sortTweetsByCreatedDate = () => {
    allTweets.sort((a, b) => b.date - a.date)
  }
  sortTweetsByCreatedDate()

  return (
    <InfoTweetsContext.Provider value={{ allTweets }}>
      {props.children}
    </InfoTweetsContext.Provider>
  )
}
export default InfoTweetsProvider
