import type { ComponentStory } from '@storybook/react'
import Snippet from '..'

export const Template: ComponentStory<typeof Snippet> = props => (
  <Snippet {...props} />
)
