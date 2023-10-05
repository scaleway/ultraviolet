import type { StoryFn } from '@storybook/react'
import { VerificationCode } from '..'

export const OnComplete: StoryFn<typeof VerificationCode> = args => {
  const onCompleteHandler = (value: unknown) => {
    console.log('Code is fully typed', value)
  }

  return <VerificationCode {...args} onComplete={onCompleteHandler} />
}

OnComplete.parameters = {
  docs: {
    description: {
      story:
        'You can use `onComplete` prop to react on a completed code typing',
    },
  },
}
