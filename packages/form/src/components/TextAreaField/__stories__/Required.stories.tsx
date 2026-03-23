import { Stack } from '@ultraviolet/ui'

import { TextAreaField } from '..'
import { Submit } from '../../Submit'

import { Template } from './Template.stories'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Required: StoryFn<ComponentProps<typeof TextAreaField>> = args => (
  <Stack gap={1}>
    <TextAreaField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = { ...Template.args, required: true }
