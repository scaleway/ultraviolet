import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Card } from '../index'

export const Template: StoryFn<ComponentProps<typeof Card>> = args => (
  <Card {...args} />
)
