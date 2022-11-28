import { ComponentStory } from '@storybook/react'
import Button from '..'

export const IconPosition: ComponentStory<typeof Button> = () => (
  <>
    <Button iconPosition="left" icon="lock">
      Left
    </Button>
    ,
    <Button iconPosition="right" icon="lock">
      Right
    </Button>
    ,
  </>
)

IconPosition.parameters = {
  docs: {
    storyDescription:
      'This show how to use `iconPosition` on Button. ⚠️ It requires an `icon`.',
  },
}
