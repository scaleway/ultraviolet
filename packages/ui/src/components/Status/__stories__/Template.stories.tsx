import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Status } from '../index'

export const Template: StoryFn<ComponentProps<typeof Status>> = args => (
  <Status {...args} />
)
