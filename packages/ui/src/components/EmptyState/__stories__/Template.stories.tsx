import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { EmptyState } from '../index'

export const Template: StoryFn<ComponentProps<typeof EmptyState>> = args => (
  <EmptyState {...args} />
)
