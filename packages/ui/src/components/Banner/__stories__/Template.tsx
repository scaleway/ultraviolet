import type { StoryFn } from '@storybook/react-vite'
import { Banner } from '..'

export const Template: StoryFn<typeof Banner> = ({ ...props }) => (
  <Banner {...props} />
)
