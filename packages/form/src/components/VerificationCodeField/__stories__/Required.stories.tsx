import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { VerificationCodeField } from '..'
import { Submit } from '../../Submit'
import { Template } from './Template.stories'

export const Required: StoryFn<
  ComponentProps<typeof VerificationCodeField>
> = args => (
  <Stack gap={1} width="fit-content">
    <VerificationCodeField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = { ...Template.args, required: true }
