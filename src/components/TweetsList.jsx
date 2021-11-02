import React from 'react'
import Tweet from './Tweet'

const TweetsList = ({ allTweets }) => {
  return (
    <div>
      {allTweets &&
        allTweets.map(tweet => <Tweet key={tweet.key} {...{ tweet }} />)}
    </div>
  )
}

export default TweetsList
