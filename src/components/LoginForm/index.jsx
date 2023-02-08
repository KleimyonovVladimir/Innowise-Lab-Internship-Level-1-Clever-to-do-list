import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import clsx from 'clsx'

import './styles.scss'

const LoginForm = ({
  title,
  buttonText,
  formMessage,
  link,
  linkText,
  onSubmit,
  onChangeForEmail,
  onChangeForPassword
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' })

  return (
    <div className={clsx('form-container', isMobile && 'form-container-mobile form-login-wrapper')}>
      <h1 className="form-title">{title}</h1>
      <form onSubmit={onSubmit}>
        <div className="form-inputs-container">
          <TextField
            name="email"
            type="email"
            label="Email"
            placeholder="example@gmail.com"
            onChange={onChangeForEmail}
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            onChange={onChangeForPassword}
          />
        </div>
        <Button variant="contained" fullWidth type="submit">
          {buttonText}
        </Button>
      </form>
      <div className={clsx('form-message', isMobile && 'form-message-mobile')}>
        <p>{formMessage}</p>

        <Link to={`/${link}`}>{linkText}</Link>
      </div>
    </div>
  )
}
export default LoginForm
