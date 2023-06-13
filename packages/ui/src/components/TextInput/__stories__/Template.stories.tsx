import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { TextInput } from '..'

export const Template: StoryFn<typeof TextInput> = ({
  defaultValue = '',
  ...args
}) => {
  const [value, setValue] = useState(defaultValue)

  return <TextInput label="Label" value={value} onChange={setValue} {...args} />
}
