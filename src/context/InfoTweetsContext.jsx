import React, { useState, useEffect, createContext } from 'react'
import getTweets from '../services/getTweets'

//Create the Context
export const InfoTweetsContext = createContext({})

const InfoTweetsProvider = props => {
  //All the tweets:
  const [allTweets, setAllTweets] = useState([])
  //This State is to show the Spinner
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const id = setInterval(
      () =>
        //Call the function in the services call "getTweets()" and assign the return to setAllTweets
        getTweets().then(tweets => setAllTweets(tweets)),
      5000
    )
    if (Object.keys(allTweets).length === 0) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
    return () => clearInterval(id)
  }, [allTweets])

  //Function to sort the Tweets by created date
  const sortTweetsByCreatedDate = () => {
    allTweets.sort((a, b) => b.date - a.date)
  }
  sortTweetsByCreatedDate()

  return (
    <InfoTweetsContext.Provider value={{ allTweets, isLoading }}>
      {props.children}
    </InfoTweetsContext.Provider>
  )
}
export default InfoTweetsProvider
