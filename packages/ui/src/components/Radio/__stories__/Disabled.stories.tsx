import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Radio } from '..'

export const Disabled: StoryFn = args => {
  const [value, onChange] = useState('disabled-label-2')

  return (
    <>
      <Radio
        {...args}
        name="disabled-label-1"
        disabled
        checked={value === 'disabled-label-1'}
        value="disabled-label-1"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.value)
        }
        label="Label 1"
      />
      <Radio
        {...args}
        name="disabled-label-2"
        checked={value === 'disabled-label-2'}
        value="disabled-label-2"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.value)
        }
        label="Label 2"
      />
    </>
  )
}

Disabled.parameters = {
  docs: {
    description: { story: 'Set activation using `disabled` property.' },
  },
}
