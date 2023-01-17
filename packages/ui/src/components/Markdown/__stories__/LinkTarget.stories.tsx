import type { Story } from '@storybook/react'
import { Markdown } from '..'
import { simple } from './markdown_example'

export const LinkTarget: Story = props => (
  <Markdown source={simple} linkTarget="_self" {...props} />
)

LinkTarget.parameters = {
  docs: {
    storyDescription:
      '`linkTarget` prop allows you to specify the target props for the links inside your markdown text. By default in react-markdown links are opened in a new tab.',
  },
}
