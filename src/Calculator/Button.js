import React from 'react'
import classnames from 'classnames'
const Button = ({ label, onClick, className }) => (
  <input
    type='button'
    onClick={onClick}
    value={label}
    className={classnames('button', className)}
  />
)

export default Button;
