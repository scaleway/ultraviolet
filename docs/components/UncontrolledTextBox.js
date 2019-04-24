/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
import { TextBox } from 'scaleway-ui'

export function UncontrolledTextBox({ defaultValue = '', ...props }) {
  const [value, setValue] = useState(defaultValue)
  return <TextBox value={value} onChange={setValue} {...props} />
}
