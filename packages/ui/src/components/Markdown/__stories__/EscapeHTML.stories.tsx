import type { Story } from '@storybook/react'
import { Markdown } from '..'
import { html } from './markdown_example'

export const EscapeHTML: Story = props => (
  <Markdown source={html} escapeHtml={false} {...props} />
)

EscapeHTML.parameters = {
  docs: {
    storyDescription: '`escapeHtml` manages the html escape of your markdown',
  },
}
