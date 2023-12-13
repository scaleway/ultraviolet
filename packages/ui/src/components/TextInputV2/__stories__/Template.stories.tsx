import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { TextInput } from '..'

export const Template: StoryFn<typeof TextInput> = ({ ...args }) => {
  const [value, setValue] = useState<string | undefined>(args.value)

  return <TextInput {...args} value={value} onChange={setValue} />
}

Template.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  value: 'Text',
}
