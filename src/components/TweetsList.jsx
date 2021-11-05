import React, { useContext } from 'react'
import Tweet from './Tweet'
import { InfoTweetsContext } from '../context/InfoTweetsContext'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'

const TweetsList = () => {
  //Extract from the provider the list of tweets:
  const { allTweets, isLoading } = useContext(InfoTweetsContext)
console.log(isLoading);
  return (
    <div>
      {isLoading ? (
        <Loader
          className='spinner'
          type='Puff'
          color='#00BFFF'
          height={100}
          width={100}
        />
      ) : null}
      {allTweets &&
        allTweets.map(tweet => <Tweet key={tweet.id} {...{ tweet }} />)}
    </div>
  )
}

export default TweetsList
