import React, { useState } from 'react'
import { TextBox } from 'components'
import { PasswordStrengthMeter } from '..'

const UncontrolledPasswordStrengthMeter = props => {
  const [value, setValue] = useState('')
  return (
    <>
      <TextBox label="Password" value={value} onChange={setValue} mb={2} />
      <PasswordStrengthMeter password={value} {...props} />
    </>
  )
}

export default UncontrolledPasswordStrengthMeter
