import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { RichTextInputField } from '..'
import { Submit } from '../../../components'

export const Template: StoryFn<ComponentProps<typeof RichTextInputField>> = args => (
  <Stack gap={1}>
    <RichTextInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Template.args = {
  label: 'Label',
  name: 'richTextInput',
}
