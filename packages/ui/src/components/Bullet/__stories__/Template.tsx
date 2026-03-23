import { Bullet } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Bullet> = ({ ...props }) => (
  <Bullet {...props} />
)
