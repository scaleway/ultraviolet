import type { ComponentStory } from '@storybook/react'
import Button from '..'

export const Progress: ComponentStory<typeof Button> = ({ ...props }) => (
  <>
    <Button progress="left" {...props}>
      left progress
    </Button>
    <Button progress="right" {...props}>
      right progress
    </Button>
    <Button progress="left" icon="lock" iconPosition="right" {...props}>
      left progress
    </Button>
    <Button progress="right" icon="lock" iconPosition="left" {...props}>
      right progress
    </Button>
  </>
)

Progress.parameters = {
  docs: {
    storyDescription: 'This shows how to use `progress` on Button.',
  },
}
