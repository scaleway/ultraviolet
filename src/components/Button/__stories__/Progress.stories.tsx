import { ComponentStory } from '@storybook/react'
import Button from '..'

export const Progress: ComponentStory<typeof Button> = () => (
  <>
    <Button progress="left">left progress</Button>
    <Button progress="right">right progress</Button>
    <Button progress="left" icon="lock" iconPosition="right">
      left progress
    </Button>
    <Button progress="right" icon="lock" iconPosition="left">
      right progress
    </Button>
  </>
)

Progress.parameters = {
  docs: {
    storyDescription: 'This shows how to use `progress` on Button.',
  },
}
