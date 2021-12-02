import PropTypes from 'prop-types'
import React, { ComponentProps, VoidFunctionComponent, useState } from 'react'
import PasswordStrengthMeter from '..'
import { TextBox } from '../..'

const UncontrolledPasswordStrengthMeter: VoidFunctionComponent<
  { name: string } & ComponentProps<typeof PasswordStrengthMeter>
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
