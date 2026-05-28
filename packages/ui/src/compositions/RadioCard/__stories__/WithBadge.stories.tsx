import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import type { ComponentProps } from 'react'
import { RadioCard } from '..'

export const WithBadge: StoryFn<ComponentProps<typeof RadioCard>> = () => {
  const [value, setValue] = useState('pro')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <RadioCard
        badgeText="Popular"
        badgeVariant="success"
        checked={value === 'basic'}
        label="Basic Plan"
        name="plan-options"
        onChange={() => setValue('basic')}
        value="basic"
      />
      <RadioCard
        badgeText="Best Value"
        badgeVariant="primary"
        checked={value === 'pro'}
        label="Pro Plan"
        name="plan-options"
        onChange={() => setValue('pro')}
        value="pro"
      />
      <RadioCard
        badgeText="New"
        badgeVariant="info"
        checked={value === 'enterprise'}
        label="Enterprise Plan"
        name="plan-options"
        onChange={() => setValue('enterprise')}
        value="enterprise"
      />
    </div>
  )
}
