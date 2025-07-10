import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { RadioGroup } from '..'

export const Controlled: StoryFn = args => {
  const [value, onChange] = useState('label-1')

  return (
    <RadioGroup
      {...args}
      legend="Legend label"
      name="controlled"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.currentTarget.value)
      }
    >
      <RadioGroup.Radio value="label-1" label="Label 1" />
      <RadioGroup.Radio value="label-2" label="Label 2" />
    </RadioGroup>
  )
}

Controlled.parameters = {
  docs: {
    description: {
      story:
        'RadioGroup only work as a controlled component. You need to pass `onChange` callback to control it.',
    },
  },
}
