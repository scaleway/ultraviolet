import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { RadioGroup } from '..'

export const Direction: StoryFn = () => {
  const [value, onChange] = useState('label-1')

  return (
    <RadioGroup
      legend="Legend label"
      name="direction"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.currentTarget.value)
      }
      direction="row"
    >
      <RadioGroup.Radio name="label-1" value="label-1" label="Label 1" />
      <RadioGroup.Radio name="label-2" value="label-2" label="Label 2" />
    </RadioGroup>
  )
}

Direction.parameters = {
  docs: {
    storyDescription:
      'Use the `direction` prop to change the direction of the group.',
  },
}
