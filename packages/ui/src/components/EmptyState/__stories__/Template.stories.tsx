import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { EmptyState } from '../index'

export const Template: StoryFn<ComponentProps<typeof EmptyState>> = args => (
  <EmptyState {...args} />
)
