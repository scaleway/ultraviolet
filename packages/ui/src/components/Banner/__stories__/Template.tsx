import type { StoryFn } from '@storybook/react'
import { Banner } from '..'

export const Template: StoryFn<typeof Banner> = ({ ...props }) => (
  <Banner {...props} />
)
