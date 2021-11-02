import React from 'react'
import Moment from 'react-moment'

const Tweet = ({ tweet }) => {
  return (
    <div className='twitter__container'>
      <div className='twitter__information'>
        <p>{tweet.userName}</p>
        <p>
          <Moment format='MMM Do h:mm:ss a'>{tweet.date}</Moment>
        </p>
      </div>
      <p className="twitter__message">{tweet.message}</p>
    </div>
  )
}

export default Tweet
