import { RichTextInput } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof RichTextInput> = args => (
  <RichTextInput {...args} />
)

Template.args = {
  value: 'Hello, world!',
}
