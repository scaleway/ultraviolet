import React, { useState } from 'react'
import { TextBox } from '..'

const UncontrolledTextBox = ({ defaultValue = '', ...props }) => {
  const [value, setValue] = useState(defaultValue)
  return <TextBox value={value} onChange={setValue} {...props} />
}

export default UncontrolledTextBox
