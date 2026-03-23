import { EmptyState } from '../index'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<ComponentProps<typeof EmptyState>> = args => (
  <EmptyState {...args} />
)
