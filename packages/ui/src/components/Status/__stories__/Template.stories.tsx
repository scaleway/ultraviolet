import { Status } from '../index'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<ComponentProps<typeof Status>> = args => (
  <Status {...args} />
)
