import PropTypes from 'prop-types'
import React, { VoidFunctionComponent, useState } from 'react'
import PasswordStrengthMeter, { PasswordStrengthMeterProps } from '..'
import { TextBox } from '../..'

const UncontrolledPasswordStrengthMeter: VoidFunctionComponent<
  { name: string } & PasswordStrengthMeterProps
> = ({ name, ...props }) => {
  const [value, setValue] = useState('')

  return (
    <>
      <TextBox
        name={name}
        label="Password"
        value={value}
        onChange={setValue}
        mb={2}
      />
      <PasswordStrengthMeter password={value} {...props} />
    </>
  )
}

UncontrolledPasswordStrengthMeter.propTypes = {
  name: PropTypes.string.isRequired,
}

export default UncontrolledPasswordStrengthMeter
