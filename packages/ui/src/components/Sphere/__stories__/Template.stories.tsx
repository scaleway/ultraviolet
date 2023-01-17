import type { ComponentStory } from '@storybook/react'
import { Sphere } from '..'

export const Template: ComponentStory<typeof Sphere> = props => (
  <Sphere {...props} />
)
