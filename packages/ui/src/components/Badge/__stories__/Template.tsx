import type { ComponentStory } from '@storybook/react'
import { Badge } from '..'

export const Template: ComponentStory<typeof Badge> = ({ ...props }) => (
  <Badge {...props} />
)
