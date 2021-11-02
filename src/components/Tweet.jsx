import React from 'react'

const Tweet = ({ tweet }) => {
  return (
    <div className='twitter__container'>
      <div className='twitter__information'>
        <p>{tweet.userName}</p>
        <p> {tweet.date} </p>
      </div>
      <p className='twitter__message'>{tweet.content}</p>
    </div>
  )
}

export default Tweet
