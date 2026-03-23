import { Stack } from '@ultraviolet/ui'

import { TimeInputField } from '..'
import { Submit } from '../../Submit'

import { Template } from './Template.stories'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Required: StoryFn<
  ComponentProps<typeof TimeInputField>
> = args => (
  <Stack gap={1}>
    <TimeInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = { ...Template.args, required: true }
