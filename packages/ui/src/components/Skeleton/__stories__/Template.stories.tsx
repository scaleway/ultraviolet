import type { StoryFn } from '@storybook/react-vite'
import { Skeleton } from '..'

export const Template: StoryFn<typeof Skeleton> = props => (
  <Skeleton {...props} />
)
