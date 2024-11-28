import type { StoryFn } from '@storybook/react'
import { useEffect, useState } from 'react'
import zxcvbn from 'zxcvbn'
import { Meter } from '..'
import { colors } from '../../../theme'
import { TextInputV2 } from '../../TextInputV2'

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
      <TextInputV2
        name="basic"
        label="Password"
        value={password}
        onChangeValue={setPassword}
      />
      <Meter
        {...args}
        value={value}
        title="Password Strength"
        strength={strength}
      />
    </div>
  )
}
