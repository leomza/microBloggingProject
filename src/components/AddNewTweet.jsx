import React, { useState } from 'react'
import Error from './Error'

const AddNewTweet = ({ addTweet }) => {
  const emptyTweet = { message: '', userName: 'Leonardo' }
  const [tweet, setTweet] = useState({ message: '', userName: 'Leonardo' })
  const [error, setError] = useState(false)
  const [countCharacter, setCountCharacter] = useState(0)

  const handleMessageChange = e => {
    setCountCharacter(e.target.value.length)
    setTweet({ ...tweet, message: e.target.value })
  }

  const submitTweet = event => {
    //By default when you submit a form the page reload and clear everything out, so we call preventDefault()
    event.preventDefault()

    //If I have an error, I set the state of the error to False
    if (tweet.message === '') {
      setError(true)
      return
    } else {
      //If I dont have error, I set the state of the error to False
      setError(false)
      addTweet(tweet)
      setTweet(emptyTweet)
      setCountCharacter(0)
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
          value={tweet.message}
          onChange={handleMessageChange}
          maxLength={300}
        />
        <small className='comment__count'>{countCharacter}</small>
        {error ? <Error message='The tweet is requiered' /> : null}
        {countCharacter < 141 ? (
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
      </form>
    </div>
  )
}

export default AddNewTweet
