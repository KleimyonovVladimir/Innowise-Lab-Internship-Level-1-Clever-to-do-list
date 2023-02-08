import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  // getAuth,
  // onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

import { userRepository } from '../config/userRepository'
import { auth } from '../firebase-config'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(userRepository.getUser())

  const signIn = async (email, password) => await signInWithEmailAndPassword(auth, email, password)

  const logOut = async () => await signOut(auth)

  const createUser = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const authUserChangeHandler = user => {
    setAuthUser(user)

    user ? userRepository.setUser(user) : userRepository.removeUser()
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setAuthUser(currentUser)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ createUser, authUser, signIn, logOut, authUserChangeHandler }}>
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
