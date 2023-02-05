import { useState } from 'react'
import { useNavigate } from 'react-router'

import LoginForm from '../../components/LoginForm'
import { useAuthContext } from '../../context/AuthContext'

const SignUpPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { createUser } = useAuthContext()

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await createUser(email, password)
      navigate('/home')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      <LoginForm
        title="Create an account"
        buttonText="Sign Up"
        linkText="Sign In"
        formMessage="Already have an account?"
        link="login"
        onSubmit={handleSubmit}
        onChangeForEmail={event => setEmail(event.target.value)}
        onChangeForPassword={event => setPassword(event.target.value)}
      />
    </>
  )
}
export default SignUpPage
