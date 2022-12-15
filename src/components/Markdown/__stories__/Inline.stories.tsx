import type { Story } from '@storybook/react'
import Markdown from '..'
import { withMultipleParagraphs } from './markdown_example'

export const Inline: Story = props => (
  <>
    <Markdown source={withMultipleParagraphs} {...props} />
    <Markdown source={withMultipleParagraphs} inline {...props} />
  </>
)

Inline.parameters = {
  docs: {
    storyDescription:
      'You can make the paragraphs inside the source render inline by setting the `inline prop`',
  },
}
