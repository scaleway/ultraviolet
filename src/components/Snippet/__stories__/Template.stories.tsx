import { ComponentStory } from '@storybook/react'
import Snippet from '..'

const multilineValue = `Lorem ipsum dolor sit amet.
`

export const Template: ComponentStory<typeof Snippet> = props => (
  <Snippet {...props} value={multilineValue} />
)
