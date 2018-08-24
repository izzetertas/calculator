import React from 'react'

const Button = ({ label, onClick }) => (
  <input
    type='button'
    onClick={onClick}
    value={label}
    className='button'
  />
)

export default Button;
