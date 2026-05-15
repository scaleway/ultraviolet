import type { StoryFn } from '@storybook/react-vite'
import { RichTextInput } from '..'

export const Template: StoryFn<typeof RichTextInput> = args => <RichTextInput {...args} />

Template.args = {
  value: 'Text content',
  label: 'Label',
}
