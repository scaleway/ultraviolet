import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Meter } from '..'
import { colors } from '../../../../theme'
import { TextInput } from '../../../Data Entry/TextInput'

const getPasswordStrength = (password: string) => {
  let score = 0
  if (password.length >= 4) {
    score += 1
  }
  if (password.length >= 8) {
    score += 1
  }
  if (/[A-Z]/v.test(password) && /[a-z]/v.test(password)) {
    score += 1
  }
  if (/\d/v.test(password) && /[^A-Za-z0-9]/v.test(password)) {
    score += 1
  }
  return Math.min(score, 4)
}

const strength = [
  { color: colors.danger.text, text: 'veryWeak' },
  { color: colors.warning.text, text: 'weak' },
  { color: colors.warning.text, text: 'medium' },
  { color: colors.success.text, text: 'strong' },
  { color: colors.success.text, text: 'veryStrong' },
]

export const Playground: StoryFn<typeof Meter> = args => {
  const [password, setPassword] = useState('')
  const value = password.length > 0 ? getPasswordStrength(password) : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextInput label="Password" name="basic" onChangeValue={setPassword} value={password} />
      <Meter {...args} strength={strength} title="Password Strength" value={value} />
    </div>
  )
}
