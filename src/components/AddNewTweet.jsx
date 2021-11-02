import React, { useState, useContext } from 'react'
import Error from './Error'
import shortid from 'shortid'
import postTweet from '../services/postTweet'
import { InfoUserNameContext } from '../context/InfoUserNameContext'

const AddNewTweet = () => {
  //Extract from the provider the information:
  const { userName } = useContext(InfoUserNameContext)

  const emptyTweet = { content: '' }
  const [tweet, setTweet] = useState({ content: '', userName: userName })
  const [error, setError] = useState(false)
  const [countCharacter, setCountCharacter] = useState(0)
  const [isPending, setIsPending] = useState(false)

  const handleMessageChange = e => {
    setCountCharacter(e.target.value.length)
    setTweet({
      ...tweet,
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
    <div className='recatangule'>
      <form onSubmit={submitTweet}>
        <textarea
          rows='5'
          cols='50'
          className='comment'
          type='text'
          placeholder='What you have in mind...'
          value={tweet.content}
          onChange={handleMessageChange}
          maxLength={300}
        />
        <small className='comment__count'>{countCharacter}</small>
        {error && countCharacter === 0 && !isPending ? (
          <Error message='The tweet is requiered' />
        ) : null}

        {countCharacter < 141 && !isPending ? (
          <button className='boton' type='submit'>
            Tweet
          </button>
        ) : (
          <div>
            <Error message="The tweet can't contain more than 140 chars." />
            <button disabled className='boton' type='submit'>
              Tweet
            </button>
          </div>
        )}

        {isPending && (
          <button disabled className='boton' type='submit'>
            Adding tweet...
          </button>
        )}
      </form>
    </div>
  )
}

export default AddNewTweet
