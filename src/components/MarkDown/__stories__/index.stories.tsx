import { Meta, Story } from '@storybook/react'
import React from 'react'
import MarkDown, { MarkDownProps } from '..'
import { html, simple, withMultipleParagraphs } from './markdown_example'

export default {
  component: MarkDown,
  title: 'Components/MarkDown',
} as Meta

const Template: Story<MarkDownProps> = args => <MarkDown {...args} />

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    storyDescription:
      'A wrapper for [react-markdown](https://github.com/remarkjs/react-markdown)',
  },
}
Default.decorators = [() => <MarkDown source={simple} linkTarget="_blank" />]

export const Inline = Template.bind({})
Inline.parameters = {
  docs: {
    storyDescription:
      'You can make the paragraphs inside the source render inline by setting the `inline prop`',
  },
}
Inline.decorators = [
  () => (
    <>
      <MarkDown source={withMultipleParagraphs} />
      <MarkDown source={withMultipleParagraphs} inline />
    </>
  ),
]

export const LinkTarget = Template.bind({})
LinkTarget.parameters = {
  docs: {
    storyDescription:
      '`linkTarget` prop allows you to specify the target props for the links inside your markdown text. By default in react-markdown links are opened in a new tab.',
  },
}
LinkTarget.decorators = [() => <MarkDown source={simple} linkTarget="_self" />]

export const EspaceHTML = Template.bind({})
EspaceHTML.parameters = {
  docs: {
    storyDescription: '`escapeHtml` manages the html escape of your markdown',
  },
}
EspaceHTML.decorators = [() => <MarkDown source={html} escapeHtml={false} />]
