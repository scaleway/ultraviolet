import type { ComponentStory } from '@storybook/react'
import { Skeleton } from '..'

export const Template: ComponentStory<typeof Skeleton> = props => (
  <Skeleton {...props} />
)
