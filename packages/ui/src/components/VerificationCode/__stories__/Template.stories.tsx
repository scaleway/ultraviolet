import type { StoryFn } from '@storybook/react-vite'
import { VerificationCode } from '..'

export const Template: StoryFn<typeof VerificationCode> = ({ ...props }) => (
  <VerificationCode {...props} />
)
