import React, { useState, useContext } from 'react'
import Error from './Error'
import { InfoUserNameContext } from '../context/InfoUserNameContext'
import styles from '../styles/profileForm.module.css'
import swal from 'sweetalert';

const ProfileForm = () => {
  //Extract from the provider the information:
  const { userName, changeUserName } = useContext(InfoUserNameContext)

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
      swal("Good job!", "You changed the username!", "success");
    }
  }

  return (
    <div>
      <h1 className={styles.title}>Profile</h1>
      <h3 className={styles.subtitle}>User Name</h3>
      <form className={styles.form__content} onSubmit={submitChangeUserName}>
        <input
          type='text'
          value={userNameEdit}
          onChange={handleUserNameChange}
          maxLength={30}
          className={styles.form__info}
        />
        {error ? <Error message='The username is requiered' /> : null}
        <button className={styles.button } type='submit'>
          Save
        </button>
      </form>
    </div>
  )
}

export default ProfileForm
