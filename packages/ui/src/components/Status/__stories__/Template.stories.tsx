import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Status } from '../index'

export const Template: StoryFn<ComponentProps<typeof Status>> = args => (
  <Status {...args} />
)
