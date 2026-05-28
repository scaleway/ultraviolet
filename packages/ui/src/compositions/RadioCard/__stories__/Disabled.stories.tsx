import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import type { ComponentProps } from 'react'
import { RadioCard } from '..'

export const Disabled: StoryFn<ComponentProps<typeof RadioCard>> = () => {
  const [value, setValue] = useState('option2')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <RadioCard
        checked={value === 'option1'}
        disabled
        label="Disabled Option 1"
        name="disabled-options"
        onChange={() => setValue('option1')}
        value="option1"
      />
      <RadioCard
        checked={value === 'option2'}
        label="Enabled Option 2"
        name="disabled-options"
        onChange={() => setValue('option2')}
        value="option2"
      />
      <RadioCard
        badgeText="Unavailable"
        checked={value === 'option3'}
        disabled
        label="Disabled Option 3"
        name="disabled-options"
        onChange={() => setValue('option3')}
        value="option3"
      />
    </div>
  )
}
