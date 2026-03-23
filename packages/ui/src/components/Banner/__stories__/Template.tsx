import { Banner } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Banner> = ({ ...props }) => (
  <Banner {...props} />
)
