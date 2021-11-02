import React from 'react'
import Tweet from './Tweet'

const TweetsList = ({ allTweets }) => {
  return (
    <div>
      {allTweets &&
        allTweets.map(tweet => <Tweet key={tweet.id} {...{ tweet }} />)}
    </div>
  )
}

export default TweetsList
