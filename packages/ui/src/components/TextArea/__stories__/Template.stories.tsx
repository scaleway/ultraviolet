import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { TextArea } from '..'

export const Template: StoryFn<typeof TextArea> = ({ ...args }) => {
  const [value, setValue] = useState<string | undefined>(args.value)

  return <TextArea {...args} onChange={setValue} value={value} />
}

Template.args = {
  label: 'Label',
  value: 'A long time ago in a galaxy far, far away',
}
