import { VerificationCode } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof VerificationCode> = ({ ...props }) => (
  <VerificationCode {...props} />
)
