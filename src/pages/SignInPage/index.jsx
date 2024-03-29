import { useState } from 'react'
import { useNavigate } from 'react-router'

import LoginForm from '../../components/LoginForm'
import { useAuthContext } from '../../context/AuthContext'
import { toastMessage } from '../../utils/toastMessage'

const SignInPage = () => {
  const navigate = useNavigate()

  const authContext = useAuthContext()
  const { signIn, googleSignIn } = useAuthContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const response = await signIn(email, password)
      authContext.authUserChangeHandler(response)

      navigate('/')
    } catch (error) {
      toastMessage(error.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()

      navigate('/')
    } catch (error) {
      toastMessage(error.message)
    }
  }

  return (
    <>
      <LoginForm
        title="Sign In"
        buttonText="Sign In"
        linkText="Registration"
        formMessage="Don't have an account yet?"
        link="sign-up"
        onSubmit={handleSubmit}
        handleGoogleSignIn={handleGoogleSignIn}
        onChangeForEmail={event => setEmail(event.target.value)}
        onChangeForPassword={event => setPassword(event.target.value)}
      />
    </>
  )
}
export default SignInPage
