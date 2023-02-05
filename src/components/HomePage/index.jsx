import { useNavigate } from 'react-router'

import { useAuthContext } from '../../context/AuthContext'
import Button from '../Button'

const Home = () => {
  const navigate = useNavigate()

  const { logOut } = useAuthContext()

  const signOutClick = async () => {
    try {
      await logOut()
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>Home page</div>
      <Button onClick={signOutClick}>Sign out</Button>
    </>
  )
}

export default Home
