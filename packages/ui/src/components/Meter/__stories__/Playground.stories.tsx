import type { StoryFn } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import zxcvbn from 'zxcvbn'
import { colors } from '../../../theme'
import { TextInput } from '../../TextInput'
import { Meter } from '..'

const strength = [
  { color: colors.danger.text, text: 'veryWeak' },
  { color: colors.warning.text, text: 'weak' },
  { color: colors.warning.text, text: 'medium' },
  { color: colors.success.text, text: 'strong' },
  { color: colors.success.text, text: 'veryStrong' },
]

export const Playground: StoryFn<typeof Meter> = args => {
  const [value, setValue] = useState<number>(0)
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    if (password.length > 0) {
      setValue(zxcvbn(password).score)
    }
  }, [password, setValue])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextInput
        label="Password"
        name="basic"
        onChangeValue={setPassword}
        value={password}
      />
      <Meter
        {...args}
        strength={strength}
        title="Password Strength"
        value={value}
      />
    </div>
  )
}
