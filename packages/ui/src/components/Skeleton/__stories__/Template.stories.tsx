import type { StoryFn } from '@storybook/react'
import { Skeleton } from '..'

export const Template: StoryFn<typeof Skeleton> = props => (
  <Skeleton {...props} />
)
