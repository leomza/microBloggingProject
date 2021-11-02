import React, { useState, createContext } from 'react'

//Create the Context
export const InfoUserNameContext = createContext({})

const InfoUserNameProvider = props => {
  //Contains the userName profile
  const [userName, setUserName] = useState('IronMan2')

  //Set the userName from the profile page
  const changeUserName = userName => {
    setUserName(userName)
  }

  return (
    <InfoUserNameContext.Provider value={{ userName, changeUserName }}>
      {props.children}
    </InfoUserNameContext.Provider>
  )
}

export default InfoUserNameProvider
