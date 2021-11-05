import React, { createContext } from 'react';
import { initializeApp } from "firebase/app";

//I create this Firebase configuration as a Context, so I can use Firebase in all my App

const firebaseConfig = {
    apiKey: "AIzaSyCYWr5QO22_nbvL1nZyTXwD_ZHyYcObDIM",
    authDomain: "microblogtwitter.firebaseapp.com",
    projectId: "microblogtwitter",
    storageBucket: "microblogtwitter.appspot.com",
    messagingSenderId: "432875085740",
    appId: "1:432875085740:web:fdfec4da645a320d7c6409"
};

export const FirebaseContext = createContext()

// Initialize Firebase
const FirebaseProvider = (props) => {
    const app = initializeApp(firebaseConfig); //"app" is the Firebase Object that I will can use in all the App and contains the information about Firebase and the data inside
    return (
        <FirebaseContext.Provider value={app}> {/* "app" is the Firebase Object that I will can use in all the App and contains the information about Firebase and the data inside*/}
            {props.children}
        </FirebaseContext.Provider>
    );
}

export default FirebaseProvider;