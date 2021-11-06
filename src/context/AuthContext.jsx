import React, { createContext, useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'

//Create the Context
export const AuthContext = createContext({})

const AuthProvider = props => {
  //Create a state to know what to render if the user is logged in or not
  const [authInfo, setAuthInfo] = useState(null)

  //I do the logout function in this way because is a bit more complicate than the login function that I do directly in the Provider value
  const logout = async () => {
    try {
      setAuthInfo(null)
      //Then I need to logout from Firebase:
      const auth = getAuth()
      await signOut(auth)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    //The value is going to be an object. That will contain the state "authInfo", and 2 functions: -Login(is going to update the state "authInfo") and -Logout
    <AuthContext.Provider
      value={{ authInfo, login: userInfo => setAuthInfo(userInfo), logout }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
