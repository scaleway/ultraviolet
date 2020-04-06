/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
import { PasswordStrengthMeter, TextBox } from 'scaleway-ui'

export function UncontrolledPasswordStrengthMeter(props) {
  const [value, setValue] = useState('')
  return (
    <>
      <TextBox label="Password" value={value} onChange={setValue} mb={2} />
      <PasswordStrengthMeter password={value} {...props} />
    </>
  )
}
