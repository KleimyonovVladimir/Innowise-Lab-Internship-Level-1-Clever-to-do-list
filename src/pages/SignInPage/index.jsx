import { useState } from 'react'
import { useNavigate } from 'react-router'

import LoginForm from '../../components/LoginForm'
import { useAuthContext } from '../../context/AuthContext'

const SignInPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuthContext()

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await signIn(email, password)
      navigate('/home')
    } catch (error) {
      console.log(error.message)
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
        onChangeForEmail={event => setEmail(event.target.value)}
        onChangeForPassword={event => setPassword(event.target.value)}
      />
    </>
  )
}
export default SignInPage
