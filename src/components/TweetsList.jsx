import React, { useContext } from 'react'
import Tweet from './Tweet'
import { InfoTweetsContext } from '../context/InfoTweetsContext'

const TweetsList = () => {
  //Extract from the provider the list of tweets:
  const { allTweets } = useContext(InfoTweetsContext)

  return (
    <div>
      {allTweets &&
        allTweets.map(tweet => <Tweet key={tweet.id} {...{ tweet }} />)}
    </div>
  )
}

export default TweetsList
