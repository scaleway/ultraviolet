import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import type { ComponentProps } from 'react'
import { RadioCard } from '..'

export const WithSideText: StoryFn<ComponentProps<typeof RadioCard>> = () => {
  const [value, setValue] = useState('monthly')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <RadioCard
        checked={value === 'monthly'}
        label="Monthly Billing"
        name="billing-cycle"
        onChange={() => setValue('monthly')}
        sideText="$10/month"
        value="monthly"
      />
      <RadioCard
        checked={value === 'yearly'}
        label="Yearly Billing"
        name="billing-cycle"
        onChange={() => setValue('yearly')}
        sideText="$100/year"
        value="yearly"
      />
    </div>
  )
}
