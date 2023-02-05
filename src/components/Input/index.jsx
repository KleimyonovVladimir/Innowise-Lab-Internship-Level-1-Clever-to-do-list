import React from 'react'

import './styles.scss'

const Input = ({ label, ...props }) => (
  <div>
    <label className="input-name">{label}</label>
    <input {...props} className="input" />
  </div>
)

export default Input
