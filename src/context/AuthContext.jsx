import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  // getAuth,
  // onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

import { auth } from '../firebase-config'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({})

  const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password)

  const logOut = () => signOut(auth)

  const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ createUser, user, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// Consumers

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (context == null) {
    throw new Error('useAuthContext should be used within a AuthContextProvider')
  }

  return context
}
