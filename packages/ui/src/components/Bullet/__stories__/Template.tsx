import type { StoryFn } from '@storybook/react'
import { Bullet } from '..'

export const Template: StoryFn<typeof Bullet> = ({ ...props }) => (
  <Bullet {...props} />
)
