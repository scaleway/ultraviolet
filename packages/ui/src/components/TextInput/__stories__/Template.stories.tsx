import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { TextInput } from '..'

export const Template: StoryFn<typeof TextInput> = ({ ...args }) => {
  const [value, setValue] = useState<string | undefined>(args.value)

  return (
    <TextInput
      {...args}
      value={value}
      onChange={event => setValue(event.target.value)}
    />
  )
}

Template.args = {
  placeholder: 'Placeholder',
  value: 'Text',
  role: 'status',
  'aria-live': 'polite',
  'aria-atomic': 'true',
}
