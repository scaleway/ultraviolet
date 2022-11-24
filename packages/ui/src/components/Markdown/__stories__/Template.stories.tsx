import { ComponentStory } from '@storybook/react'
import Markdown from '..'
import { simple } from './markdown_example'

export const Template: ComponentStory<typeof Markdown> = ({ ...props }) => (
  <Markdown {...props} />
)

Template.args = {
  source: simple,
}
