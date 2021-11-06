import React, { useState, createContext } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'

//Create the Context
export const InfoUserNameContext = createContext({})

const InfoUserNameProvider = props => {
  const auth = getAuth()
  //Contains the userName profile
  const [userName, setUserName] = useState('')

  //Set the userName from the profile page
  const changeUserName = userName => {
    setUserName(userName)
    updateProfile(auth.currentUser, {
      displayName: userName
    })
  }

  return (
    <InfoUserNameContext.Provider value={{ userName, changeUserName }}>
      {props.children}
    </InfoUserNameContext.Provider>
  )
}

export default InfoUserNameProvider
