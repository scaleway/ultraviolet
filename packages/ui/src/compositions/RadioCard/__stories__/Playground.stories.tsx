import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import type { ComponentProps } from 'react'
import { RadioCard } from '../'

export const Playground: StoryFn<ComponentProps<typeof RadioCard>> = args => {
  const [value, setValue] = useState(args.value as string)

  return <RadioCard {...args} checked={value === args.value} onChange={() => setValue(args.value as string)} />
}

Playground.args = {
  badgeText: 'Recommended',
  badgeVariant: 'primary',
  label: 'Premium Plan',
  labelDescription: 'Our best plan with all features included',
  name: 'playground-options',
  sideText: '$29/month',
  value: 'premium',
}
