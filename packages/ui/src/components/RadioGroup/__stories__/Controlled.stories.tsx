import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { RadioGroup } from '..'

export const Controlled: StoryFn = () => {
  const [value, onChange] = useState('label-1')

  return (
    <RadioGroup
      legend="Legend label"
      name="controlled"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.currentTarget.value)
      }
    >
      <RadioGroup.Radio name="label-1" value="label-1" label="Label 1" />
      <RadioGroup.Radio name="label-2" value="label-2" label="Label 2" />
    </RadioGroup>
  )
}

Controlled.parameters = {
  docs: {
    storyDescription:
      'RadioGroup only work as a controlled component. You need to pass `onChange` callback to control it.',
  },
}
