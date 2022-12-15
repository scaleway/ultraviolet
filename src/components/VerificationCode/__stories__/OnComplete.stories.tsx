import type { ComponentStory } from '@storybook/react'
import VerificationCode from '..'

export const OnComplete: ComponentStory<typeof VerificationCode> = () => {
  const onCompleteHandler = (value: unknown) => {
    console.log('Code is fully typed', value)
  }

  return <VerificationCode onComplete={onCompleteHandler} />
}

OnComplete.parameters = {
  docs: {
    storyDescription:
      'You can use `onComplete` prop to react on a completed code typing',
  },
}
