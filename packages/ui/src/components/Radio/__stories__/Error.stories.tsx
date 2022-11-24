import { Story } from '@storybook/react'
import { useState } from 'react'
import Radio from '..'

export const Error: Story = () => {
  const [value, onChange] = useState('error-label-1')

  return (
    <>
      <Radio
        name="error-label-1"
        error="invalid"
        checked={value === 'error-label-1'}
        value="error-label-1"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.value)
        }
      >
        Label 1
      </Radio>
      <Radio
        name="error-label-2"
        checked={value === 'error-label-2'}
        value="error-label-2"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.value)
        }
      >
        Label 2
      </Radio>
    </>
  )
}

Error.parameters = {
  docs: {
    storyDescription:
      'Set validation with error message using `error` property.',
  },
}
