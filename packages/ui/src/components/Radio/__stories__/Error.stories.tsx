import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Radio } from '..'

export const Error: StoryFn = args => {
  const [value, onChange] = useState('error-label-1')

  return (
    <>
      <Radio
        {...args}
        checked={value === 'error-label-1'}
        error="invalid"
        label="Label 1"
        name="error-label"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
        value="error-label-1"
      />
      <Radio
        {...args}
        checked={value === 'error-label-2'}
        error="invalid"
        label="Label 1"
        name="error-label"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
        value="error-label-2"
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
