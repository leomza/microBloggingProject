import React, { useState, useEffect, createContext, useContext } from 'react'
import { FirebaseContext } from '../config/Firebase'
import {
  getFirestore,
  collection,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  limit,
  getDocs
} from 'firebase/firestore' //I use "onSnapshot" because that call every second to the database and check if something change. If it change will re-render all the component again

//Create the Context
export const InfoTweetsContext = createContext({})

const InfoTweetsProvider = props => {
  //All the tweets:
  const [allTweets, setAllTweets] = useState([])
  //This State is to show the Spinner
  const [isLoading, setIsLoading] = useState(true)

  //This is how to get the data from Firebase
  const firebase = useContext(FirebaseContext)
  const db = getFirestore(firebase)

  useEffect(() => {
    //First get a snapShot from the database
    const updateState = snapshot => {
      //I will push all the data from Firestore to this variable
      const tweetsFromDataBase = []
      snapshot.forEach(doc => {
        //When I push the "tweet" I also going to add the firebase Id that create Firebase automatically
        tweetsFromDataBase.push({ id: doc.id, ...doc.data() })
      })
      //Then I set all the tweets with the information from Firebase
      setAllTweets(tweetsFromDataBase)
    }

    //Create a variable that will contain the query
    const q = query(collection(db, 'tweets'), orderBy('date', 'desc'))
    //Everytime the database change with "onSnapShot" the "q"(query) is going to work and when that happens is going to call the "updateState" function
    const unsub = onSnapshot(q, querySnapshot => updateState(querySnapshot))
    setIsLoading(false)
    return () => {
      unsub()
    }
  }, [])

  return (
    <InfoTweetsContext.Provider value={{ allTweets, isLoading }}>
      {props.children}
    </InfoTweetsContext.Provider>
  )
}
export default InfoTweetsProvider
