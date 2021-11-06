import React, { useState, useContext } from 'react'
import Error from './Error'
import { InfoUserNameContext } from '../context/InfoUserNameContext'
import styles from '../styles/addNewTweet.module.css'
import { collection, addDoc } from 'firebase/firestore'
import { FirebaseContext } from '../config/Firebase'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const AddNewTweet = () => {
  //Extract from the provider the information:
  const { userName } = useContext(InfoUserNameContext)

  const auth = getAuth()
  const user = auth.currentUser

  //This is how to get the data from Firebase
  const firebase = useContext(FirebaseContext)
  const db = getFirestore(firebase)

  const emptyTweet = { content: '' }
  const [tweet, setTweet] = useState({})
  const [error, setError] = useState(false)
  const [countCharacter, setCountCharacter] = useState(0)
  const [isPending, setIsPending] = useState(false)

  const handleMessageChange = e => {
    setCountCharacter(e.target.value.length)
    setTweet({
      userName: user.uid,
      content: e.target.value,
      date: new Date().toISOString()
    })
    console.log(tweet)
  }

  const submitTweet = async event => {
    try {
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
        await addDoc(collection(db, 'tweets'), tweet)
        setIsPending(false)
        setTweet(emptyTweet)
        setCountCharacter(0)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
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

          {error && countCharacter === 0 ? (
            <Error message='The tweet is requiered' />
          ) : null}

          {countCharacter > 140 ? (
            <div className={styles.content__error}>
              <Error message="The tweet can't contain more than 140 chars." />
              <button disabled className={styles.button} type='submit'>
                Tweet
              </button>
            </div>
          ) : null}

          {isPending ? (
            <button disabled className={styles.button} type='submit'>
              Adding tweet...
            </button>
          ) : null}

          {!isPending && countCharacter >= 0 && countCharacter <= 140 ? (
            <button className={styles.button} type='submit'>
              Tweet
            </button>
          ) : null}
        </div>
      </form>
    </div>
  )
}

export default AddNewTweet
