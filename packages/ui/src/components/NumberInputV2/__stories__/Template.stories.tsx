import type { StoryFn } from '@storybook/react'
import { NumberInputV2 } from '..'

export const Template: StoryFn<typeof NumberInputV2> = props => (
  <NumberInputV2 {...props} />
)
