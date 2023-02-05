import { Link } from 'react-router-dom'

import Button from '../Button'
import Input from '../Input'

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
  return (
    <div className="form-container">
      <h1 className="form-title">{title}</h1>
      <form onSubmit={onSubmit}>
        <div className="form-inputs-container">
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="example@gmail.com"
            onChange={onChangeForEmail}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            onChange={onChangeForPassword}
          />
        </div>
        <Button type="submit">{buttonText}</Button>
      </form>
      <div className="form-message">
        <p>{formMessage}</p>
        <Link to={`/${link}`}>{linkText}</Link>
      </div>
    </div>
  )
}
export default LoginForm
