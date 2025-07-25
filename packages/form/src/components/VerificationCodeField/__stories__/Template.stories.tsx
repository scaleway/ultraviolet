import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { VerificationCodeField } from '..'
import { Submit } from '../..'

export const Template: StoryFn<
  ComponentProps<typeof VerificationCodeField>
> = args => (
  <Stack gap="1" width="fit-content">
    <VerificationCodeField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Template.args = { name: 'verification' }
