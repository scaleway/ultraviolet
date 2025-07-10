import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Radio } from '..'

export const Error: StoryFn = args => {
  const [value, onChange] = useState('error-label-1')

  return (
    <>
      <Radio
        {...args}
        name="error-label-1"
        error="invalid"
        checked={value === 'error-label-1'}
        value="error-label-1"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.value)
        }
        label="Label 1"
      />
      <Radio
        {...args}
        name="error-label-2"
        checked={value === 'error-label-2'}
        value="error-label-2"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.value)
        }
        label="Label 1"
      />
    </>
  )
}

Error.parameters = {
  docs: {
    description: {
      story: 'Set validation with error message using `error` property.',
    },
  },
}
