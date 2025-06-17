import { useState } from 'react'
import zxcvbn from 'zxcvbn'
import { colors } from '../../../theme'
import { TextInput } from '../../TextInput'
import { PasswordStrengthMeter } from '../index'

export const ForbiddenInputs = () => {
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
        forbiddenInputs={['qwerty']}
      />
    </div>
  )
}

ForbiddenInputs.parameters = {
  docs: {
    description: {
      story: `__forbiddenInputs__ properties can be used to specify which word shouldn't be used for a password. That way you can force user to avoid using sensitive data such as: their email, login, name, etc.

In this example try to type __qwerty__, the score should be really low as the word has been "banned" using __forbiddenInputs__ properties.`,
    },
  },
}
