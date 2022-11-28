import { ComponentStory } from '@storybook/react'
import ProgressionButton from '..'

export const Example: ComponentStory<typeof ProgressionButton> = () => (
  <>
    <ProgressionButton
      creation={new Date(new Date().setSeconds(new Date().getSeconds() + 10))}
      duration={20}
    >
      I&apos;m going to start in 10 seconds and take 20 seconds to complete
    </ProgressionButton>
    <ProgressionButton
      creation={new Date(new Date().setSeconds(new Date().getSeconds() - 60))}
      duration={90}
    >
      I was supposed to start one minute ago and take 90 seconds (meaning I only
      have 30s left and start at 66%)
    </ProgressionButton>
    <ProgressionButton
      creation={new Date(new Date().setSeconds(new Date().getSeconds() - 90))}
      duration={90}
    >
      I was supposed to start 90 seconds ago and take 90 seconds (meaning
      I&apos;m already done)
    </ProgressionButton>
  </>
)
