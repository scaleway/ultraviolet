import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import type { ComponentProps } from 'react'
import { RadioCard } from '..'

export const WithDescription: StoryFn<ComponentProps<typeof RadioCard>> = () => {
  const [value, setValue] = useState('standard')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <RadioCard
        checked={value === 'standard'}
        label="Standard Shipping"
        labelDescription="Delivered in 5-7 business days"
        name="shipping-options"
        onChange={() => setValue('standard')}
        value="standard"
      />
      <RadioCard
        checked={value === 'express'}
        label="Express Shipping"
        labelDescription="Delivered in 2-3 business days"
        name="shipping-options"
        onChange={() => setValue('express')}
        value="express"
      />
      <RadioCard
        checked={value === 'overnight'}
        label="Overnight Shipping"
        labelDescription="Delivered next business day"
        name="shipping-options"
        onChange={() => setValue('overnight')}
        value="overnight"
      />
    </div>
  )
}
