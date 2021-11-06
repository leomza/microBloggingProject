import React, { Fragment, useContext, useState } from 'react'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import { AuthContext } from '../context/AuthContext'
import { InfoUserNameContext } from '../context/InfoUserNameContext'

const Login = () => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  //Use the function "login" from authContext
  const { login } = useContext(AuthContext)
  //Use the function changeUserName to after Log In or Sign Up I will set the current username
  const { changeUserName } = useContext(InfoUserNameContext)

  const [newUserName, setNewUserName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [existEmail, setExistEmail] = useState('')
  const [existPassword, setExistPassword] = useState('')

  const handleLogIn = async () => {
    try {
      const userData = await signInWithPopup(auth, provider)
      login({ name: userData.user.displayName, email: userData.user.email })
      changeUserName(userData.user.displayName)
    } catch (error) {
      console.error(error)
    }
  }

  const handleNewUserName = e => setNewUserName(e.target.value)
  const handleNewEmail = e => setNewEmail(e.target.value)
  const handleNewPassword = e => setNewPassword(e.target.value)

  const handleExistEmail = e => setExistEmail(e.target.value)
  const handleExistPassword = e => setExistPassword(e.target.value)

  const submitNewUser = async event => {
    try {
      //By default when you submit a form the page reload and clear everything out, so we call preventDefault()
      event.preventDefault()

      const user = await createUserWithEmailAndPassword(
        auth,
        newEmail,
        newPassword
      )
      //Then I will add the username to the new user
      updateProfile(user, {
        displayName: newUserName
      })
      changeUserName(user.displayName)
    } catch (error) {
      console.error(error)
    }
  }

  const submitExistUser = async event => {
    try {
      //By default when you submit a form the page reload and clear everything out, so we call preventDefault()
      event.preventDefault()
      await signInWithEmailAndPassword(auth, existEmail, existPassword)
      changeUserName(auth.currentUser.displayName)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Fragment>
      <div onClick={handleLogIn}>Login with Google</div>
      <form onSubmit={submitNewUser}>
        <input
          type='text'
          placeholder='Enter your username'
          value={newUserName}
          onChange={handleNewUserName}
          maxLength={30}
        />
        <input
          type='email'
          placeholder='Enter your email'
          value={newEmail}
          onChange={handleNewEmail}
          maxLength={30}
        />
        <input
          type='password'
          placeholder='Enter your password'
          value={newPassword}
          onChange={handleNewPassword}
          maxLength={10}
        />
        <button type='submit'>Sign Up</button>
      </form>

      <form onSubmit={submitExistUser}>
        <input
          type='email'
          placeholder='Enter your email'
          value={existEmail}
          onChange={handleExistEmail}
          maxLength={30}
        />
        <input
          type='password'
          placeholder='Enter your password'
          value={existPassword}
          onChange={handleExistPassword}
          maxLength={10}
        />
        <button type='submit'>Log In</button>
      </form>
    </Fragment>
  )
}

export default Login
