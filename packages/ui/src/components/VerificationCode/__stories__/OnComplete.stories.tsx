import type { StoryFn } from '@storybook/react-vite'
import { VerificationCode } from '..'

const onCompleteHandler = (value: unknown) => {
  // oxlint-disable-next-line no-console
  console.log('Code is fully typed', value)
}

export const OnComplete: StoryFn<typeof VerificationCode> = args => (
  <VerificationCode
    {...args}
    label="Verification code"
    onComplete={onCompleteHandler}
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
