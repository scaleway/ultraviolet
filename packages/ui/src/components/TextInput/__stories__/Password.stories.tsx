import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { CopyButton } from '../../CopyButton'
import { Stack } from '../../Stack'
import { TextInput } from '..'

const generateRandomPassword = (length = 12) => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  return Array.from(
    { length },
    () => charset[Math.floor(Math.random() * charset.length)],
  ).join('')
}
export const Password: StoryFn<typeof TextInput> = ({ ...args }) => {
  const [value, setValue] = useState<string | undefined>(args.value)
  const [value2, setValue2] = useState<string | undefined>(args.value)
  const [value3, setValue3] = useState<string | undefined>(args.value)

  return (
    <Stack gap={2}>
      <TextInput
        {...args}
        label="Password"
        onChange={event => setValue(event.target.value)}
        type="password"
        value={value}
      />
      <TextInput
        {...args}
        label="Password with randomize"
        onChange={event => setValue2(event.target.value)}
        onRandomize={() => {
          setValue2(generateRandomPassword())
        }}
        type="password"
        value={value2}
      />
      <TextInput
        {...args}
        label="Passord with copy button"
        onChange={event => setValue3(event.target.value)}
        suffix={<CopyButton sentiment="neutral" value={value3 ?? ''} />}
        type="password"
        value={value3}
      />
    </Stack>
  )
}

Password.args = {
  'aria-atomic': 'true',
  'aria-live': 'polite',
  placeholder: 'Placeholder',
  role: 'status',
  value: 'Text',
}
