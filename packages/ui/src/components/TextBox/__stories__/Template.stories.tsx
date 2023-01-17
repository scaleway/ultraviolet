import type { ComponentStory } from '@storybook/react'
import { useState } from 'react'
import { TextBox } from '..'

export const Template: ComponentStory<typeof TextBox> = ({
  defaultValue = '',
  ...args
}) => {
  const [value, setValue] = useState(defaultValue)

  return <TextBox label="Label" value={value} onChange={setValue} {...args} />
}
