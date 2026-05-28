import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import type { ComponentProps } from 'react'
import { RadioCard } from '..'

export const Error: StoryFn<ComponentProps<typeof RadioCard>> = () => {
  const [value, setValue] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <RadioCard
        checked={value === 'option1'}
        error="Please select one of the options to continue"
        label="Option 1"
        name="error-options"
        onChange={() => setValue('option1')}
        value="option1"
      />
      <RadioCard
        checked={value === 'option2'}
        label="Option 2"
        name="error-options"
        onChange={() => setValue('option2')}
        value="option2"
      />
      <RadioCard
        checked={value === 'option3'}
        label="Option 3"
        name="error-options"
        onChange={() => setValue('option3')}
        value="option3"
      />
    </div>
  )
}
