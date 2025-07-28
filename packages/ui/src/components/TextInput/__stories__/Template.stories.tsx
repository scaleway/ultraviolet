import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { TextInput } from '..'

export const Template: StoryFn<typeof TextInput> = ({ ...args }) => {
  const [value, setValue] = useState<string | undefined>(args.value)

  return (
    <TextInput
      {...args}
      onChange={event => setValue(event.target.value)}
      value={value}
    />
  )
}

Template.args = {
  'aria-atomic': 'true',
  'aria-live': 'polite',
  placeholder: 'Placeholder',
  role: 'status',
  value: 'Text',
}
