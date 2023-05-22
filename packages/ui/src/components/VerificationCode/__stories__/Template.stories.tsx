import type { ComponentStory } from '@storybook/react'
import { VerificationCode } from '..'

export const Template: ComponentStory<typeof VerificationCode> = ({
  ...props
}) => <VerificationCode {...props} />
