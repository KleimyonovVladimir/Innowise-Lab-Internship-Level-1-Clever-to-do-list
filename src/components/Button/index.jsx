import React from 'react'

import './styles.scss'

const Button = ({ children, type, onClick }) => (
  <button className="button" type={type} onClick={onClick}>
    {children}
  </button>
)

export default Button
