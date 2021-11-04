import React, { useState, useContext, Fragment } from 'react'
import Error from './Error'
import shortid from 'shortid'
import postTweet from '../services/postTweet'
import { InfoUserNameContext } from '../context/InfoUserNameContext'
import styles from '../styles/addNewTweet.module.css'
import { InfoTweetsContext } from '../context/InfoTweetsContext'

const AddNewTweet = () => {
  //Extract from the provider the information:
  const { userName } = useContext(InfoUserNameContext)
  const { isLoading } = useContext(InfoTweetsContext)

  const emptyTweet = { content: '' }
  const [tweet, setTweet] = useState({})
  const [error, setError] = useState(false)
  const [countCharacter, setCountCharacter] = useState(0)
  const [isPending, setIsPending] = useState(false)

  const handleMessageChange = e => {
    setCountCharacter(e.target.value.length)
    setTweet({
      userName: userName,
      content: e.target.value,
      date: new Date().toISOString(),
      id: shortid.generate()
    })
  }

  const submitTweet = event => {
    //By default when you submit a form the page reload and clear everything out, so we call preventDefault()
    event.preventDefault()

    //If I have an error, I set the state of the error to False
    if (tweet.content === '') {
      setError(true)
      return
    } else {
      //If I dont have error, I set the state of the error to False
      setError(false)
      setIsPending(true)

      //Function that will post the twitter in the server
      postTweet(tweet).then(() => {
        setIsPending(false)
        setTweet(emptyTweet)
        setCountCharacter(0)
      })
    }
  }

  return (
    <Fragment>
      {isLoading ? null : (
        <div className={styles.recatangule}>
          <form className={styles.recatangule__form} onSubmit={submitTweet}>
            <textarea
              rows='5'
              cols='50'
              className={styles.comment}
              type='text'
              placeholder='What you have in mind...'
              value={tweet.content}
              onChange={handleMessageChange}
              maxLength={300}
            />
            <div className={styles.rectangule__info}>
              <small className={styles.comment__count}>{countCharacter}</small>

              {error && countCharacter === 0 && !isPending ? (
                <Error message='The tweet is requiered' />
              ) : null}

              {countCharacter < 141 ? (
                <button className={styles.button} type='submit'>
                  Tweet
                </button>
              ) : (
                <div className={styles.content__error}>
                  <Error message="The tweet can't contain more than 140 chars." />
                  <button disabled className={styles.button} type='submit'>
                    Tweet
                  </button>
                </div>
              )}

              {isPending && (
                <button disabled className={styles.button} type='submit'>
                  Adding tweet...
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </Fragment>
  )
}

export default AddNewTweet
