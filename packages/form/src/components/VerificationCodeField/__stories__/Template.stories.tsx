import { Stack } from '@ultraviolet/ui'

import { VerificationCodeField } from '..'
import { Submit } from '../..'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<
  ComponentProps<typeof VerificationCodeField>
> = args => (
  <Stack gap="1" width="fit-content">
    <VerificationCodeField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Template.args = { name: 'verification' }
