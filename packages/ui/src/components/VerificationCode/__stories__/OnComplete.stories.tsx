import type { StoryFn } from '@storybook/react'
import { VerificationCode } from '..'

const onCompleteHandler = (value: unknown) => {
  // oxlint-disable-next-line no-console
  console.log('Code is fully typed', value)
}

export const OnComplete: StoryFn<typeof VerificationCode> = args => (
  <VerificationCode
    {...args}
    onComplete={onCompleteHandler}
    label="Verification code"
  />
)

OnComplete.parameters = {
  docs: {
    description: {
      story:
        'You can use `onComplete` prop to react on a completed code typing',
    },
  },
}
