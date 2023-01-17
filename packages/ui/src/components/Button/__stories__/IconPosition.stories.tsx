import type { ComponentStory } from '@storybook/react'
import { Button } from '..'

export const IconPosition: ComponentStory<typeof Button> = ({ ...props }) => (
  <>
    <Button iconPosition="left" icon="lock" {...props}>
      Left
    </Button>
    <Button iconPosition="right" icon="lock" {...props}>
      Right
    </Button>
  </>
)

IconPosition.parameters = {
  docs: {
    storyDescription:
      'This show how to use `iconPosition` on Button. ⚠️ It requires an `icon`.',
  },
}
