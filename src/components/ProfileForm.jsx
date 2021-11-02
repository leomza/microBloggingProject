import React, { useState } from 'react'
import Error from './Error'

const ProfileForm = ({ userName, changeUserName }) => {
  const [error, setError] = useState(false)
  const [userNameEdit, setUserNameEdit] = useState(userName)

  const handleUserNameChange = e => {
    setUserNameEdit(e.target.value)
  }

  const submitChangeUserName = event => {
    //By default when you submit a form the page reload and clear everything out, so we call preventDefault()
    event.preventDefault()

    //If I have an error, I set the state of the error to False
    if (userNameEdit === '') {
      setError(true)
      return
    } else {
      //If I dont have error, I set the state of the error to False
      setError(false)
      changeUserName(userNameEdit)
    }
  }

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={submitChangeUserName}>
        <input
          type='text'
          value={userNameEdit}
          onChange={handleUserNameChange}
          maxLength={30}
        />
        {error ? <Error message='The username is requiered' /> : null}
        <button className='boton' type='submit'>
          Save
        </button>
      </form>
    </div>
  )
}

export default ProfileForm