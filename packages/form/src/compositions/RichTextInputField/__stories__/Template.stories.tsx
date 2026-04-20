import { Stack } from '@ultraviolet/ui'

import { RichTextInputField } from '..'
import { Submit } from '../../../components'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<
  ComponentProps<typeof RichTextInputField>
> = args => (
  <Stack gap={1}>
    <RichTextInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Template.args = {
  label: 'Label',
  name: 'richTextInput',
}
