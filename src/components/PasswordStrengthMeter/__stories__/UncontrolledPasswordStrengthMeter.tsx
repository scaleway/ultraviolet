import PropTypes from 'prop-types'
import { ComponentProps, VoidFunctionComponent, useState } from 'react'
import PasswordStrengthMeter from '..'
import { TextBox } from '../..'

const UncontrolledPasswordStrengthMeter: VoidFunctionComponent<
  { name: string } & ComponentProps<typeof PasswordStrengthMeter>
> = ({ name, ...props }) => {
  const [value, setValue] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextBox name={name} label="Password" value={value} onChange={setValue} />
      <PasswordStrengthMeter password={value} {...props} />
    </div>
  )
}

UncontrolledPasswordStrengthMeter.propTypes = {
  name: PropTypes.string.isRequired,
}

export default UncontrolledPasswordStrengthMeter
