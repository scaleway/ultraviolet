import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Status } from '../index'

export const Template: Story<ComponentProps<typeof Status>> = args => (
  <Status {...args} />
)
