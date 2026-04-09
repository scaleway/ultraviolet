import { RichTextEditor } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof RichTextEditor> = args => (
  <RichTextEditor {...args} />
)

Template.args = {
  value: 'Hello, world!',
}
