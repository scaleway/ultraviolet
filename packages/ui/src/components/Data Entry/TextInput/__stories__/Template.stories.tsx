import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { TextInput } from '..'

export const Template: StoryFn<typeof TextInput> = ({ ...args }) => {
  const [value, setValue] = useState(args.value)

  return <TextInput {...args} onChange={event => setValue(event.target.value)} value={value} />
}

Template.args = {
  placeholder: 'Placeholder',
  type: 'text',
}
