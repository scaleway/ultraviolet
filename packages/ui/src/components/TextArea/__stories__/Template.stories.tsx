import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { TextArea } from '..'

export const Template: StoryFn<typeof TextArea> = ({ ...args }) => {
  const [value, setValue] = useState<string>(args.value)

  return <TextArea {...args} value={value} onChange={setValue} />
}

Template.args = {
  label: 'Label',
  value: 'A long time ago in a galaxy far, far away',
}
