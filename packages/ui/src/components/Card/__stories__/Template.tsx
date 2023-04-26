import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Card } from '../index'

export const Template: Story<ComponentProps<typeof Card>> = args => (
  <Card {...args} />
)
