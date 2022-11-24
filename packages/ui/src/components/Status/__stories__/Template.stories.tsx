import { Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Status from '../index'

export const Template: Story<ComponentProps<typeof Status>> = args => (
  <Status {...args} />
)
