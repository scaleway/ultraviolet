import { Skeleton } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Skeleton> = props => (
  <Skeleton {...props} />
)
