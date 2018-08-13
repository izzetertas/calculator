import React from 'react'

const Button = ({ label, onClick, disabled }) => (
  <input
    type='button'
    onClick={onClick}
    value={label}
    disabled={disabled}
    className='button'
  />
)

export default Button;
