import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { TextInputV2 } from '..'
import { CopyButton } from '../../CopyButton'
import { Stack } from '../../Stack'

const generateRandomPassword = (length = 12) => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  return Array.from(
    { length },
    () => charset[Math.floor(Math.random() * charset.length)],
  ).join('')
}
export const Password: StoryFn<typeof TextInputV2> = ({ ...args }) => {
  const [value, setValue] = useState<string | undefined>(args.value)
  const [value2, setValue2] = useState<string | undefined>(args.value)
  const [value3, setValue3] = useState<string | undefined>(args.value)

  return (
    <Stack gap={2}>
      <TextInputV2
        {...args}
        label="Password"
        value={value}
        onChange={event => setValue(event.target.value)}
        type="password"
      />
      <TextInputV2
        {...args}
        label="Password with randomize"
        value={value2}
        onChange={event => setValue2(event.target.value)}
        type="password"
        onRandomize={() => {
          setValue2(generateRandomPassword())
        }}
      />
      <TextInputV2
        {...args}
        label="Passord with copy button"
        value={value3}
        onChange={event => setValue3(event.target.value)}
        type="password"
        suffix={<CopyButton value={value3 ?? ''} sentiment="neutral" />}
      />
    </Stack>
  )
}

Password.args = {
  placeholder: 'Placeholder',
  value: 'Text',
  role: 'status',
  'aria-live': 'polite',
  'aria-atomic': 'true',
}
