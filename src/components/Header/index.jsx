import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import clsx from 'clsx'

import { useAuthContext } from '../../context/AuthContext'
import { toastMessage } from '../../utils/toastMessage'

import './styles.scss'

const Header = () => {
  const navigate = useNavigate()

  const { logOut } = useAuthContext()

  const signOutClick = async () => {
    try {
      await logOut()
      navigate('/login')
    } catch (error) {
      toastMessage(error.message)
    }
  }

  const isMobile = useMediaQuery({ query: '(max-width: 576px)' })

  return (
    <header className="header">
      <Link to="/" className="logo">
        <h1 className={clsx('', isMobile && 'logo-small')}>My todo app</h1>
      </Link>
      <Button variant="contained" onClick={signOutClick}>
        Sign out
      </Button>
    </header>
  )
}

export default Header
