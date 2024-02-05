import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { TextInputV2 } from '..'

export const Template: StoryFn<typeof TextInputV2> = ({ ...args }) => {
  const [value, setValue] = useState<string | undefined>(args.value)

  return <TextInputV2 {...args} value={value} onChange={setValue} />
}

Template.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  value: 'Text',
}
