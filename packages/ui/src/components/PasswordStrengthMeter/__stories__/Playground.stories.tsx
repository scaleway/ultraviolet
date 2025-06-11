import { useState } from 'react'
import zxcvbn from 'zxcvbn'
import { colors } from '../../../theme'
import { TextInput } from '../../TextInput'
import { PasswordStrengthMeter } from '../index'

export const Playground = () => {
  const [value, setValue] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextInput
        name="basic"
        label="Password"
        value={value}
        onChangeValue={setValue}
      />
      <PasswordStrengthMeter
        password={value}
        estimate={zxcvbn}
        title="Password Strength"
        strength={[
          { color: colors.danger.text, t: 'veryWeak' },
          { color: colors.warning.text, t: 'weak' },
          { color: colors.warning.text, t: 'medium' },
          { color: colors.success.text, t: 'strong' },
          { color: colors.success.text, t: 'veryStrong' },
        ]}
      />
    </div>
  )
}
