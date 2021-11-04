import React from 'react'
import styles from '../styles/tweet.module.css'

const Tweet = ({ tweet }) => {
  return (
    <div className={styles.twitter__container}>
      <div className={styles.twitter__information}>
        <p>{tweet.userName}</p>
        <p> {tweet.date} </p>
      </div>
      <p className={styles.twitter__message}>{tweet.content}</p>
    </div>
  )
}

export default Tweet
