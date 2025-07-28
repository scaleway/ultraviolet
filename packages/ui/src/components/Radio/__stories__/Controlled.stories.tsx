import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Radio } from '..'

export const Controlled: StoryFn = args => {
  const [value, onChange] = useState('label-1')

  return (
    <>
      <Radio
        {...args}
        checked={value === 'label-1'}
        label="Label 1"
        name="label-1"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.value)
        }
        value="label-1"
      />
      <Radio
        {...args}
        checked={value === 'label-2'}
        label="Label 2"
        name="label-2"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.value)
        }
        value="label-2"
      />
    </>
  )
}
Controlled.parameters = {
  docs: {
    description: {
      story:
        'Radio only work as a controlled component. You need to pass `onChange` callback to control it.',
    },
  },
}
