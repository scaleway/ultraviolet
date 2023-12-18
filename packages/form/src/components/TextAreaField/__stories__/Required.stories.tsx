import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { TextAreaFieldProps } from '..'
import { TextAreaField } from '..'
import { Submit } from '../../Submit'
import { Template } from './Template.stories'

export const Required: StoryFn<TextAreaFieldProps> = args => (
  <Stack gap={1}>
    <TextAreaField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = { ...Template.args, required: true }
