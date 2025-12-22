import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../../Submit'
import { FileInputField } from '..'
import { Template } from './Template.stories'

export const Required: StoryFn<
  ComponentProps<typeof FileInputField>
> = args => (
  <Stack gap={1}>
    <FileInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = { ...Template.args, required: true }
