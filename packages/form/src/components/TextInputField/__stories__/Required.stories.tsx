import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../../Submit'
import { TextInputField } from '..'
import { Template } from './Template.stories'

export const Required: StoryFn<
  ComponentProps<typeof TextInputField>
> = args => (
  <Stack gap={1}>
    <TextInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = { ...Template.args, required: true }
