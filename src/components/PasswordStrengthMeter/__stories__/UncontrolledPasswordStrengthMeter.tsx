import type { ComponentProps } from 'react'
import { useState } from 'react'
import PasswordStrengthMeter from '..'
import { TextBox } from '../..'

const UncontrolledPasswordStrengthMeter = ({
  name,
  ...props
}: { name: string } & ComponentProps<typeof PasswordStrengthMeter>) => {
  const [value, setValue] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextBox name={name} label="Password" value={value} onChange={setValue} />
      <PasswordStrengthMeter password={value} {...props} />
    </div>
  )
}

export default UncontrolledPasswordStrengthMeter
