import type { ComponentStory } from '@storybook/react'
import Bullet from '..'

export const Template: ComponentStory<typeof Bullet> = ({ ...props }) => (
  <Bullet {...props} />
)
