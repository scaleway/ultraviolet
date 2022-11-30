import { ComponentStory } from '@storybook/react'
import Button from '..'

export const Extend: ComponentStory<typeof Button> = ({ ...props }) => (
  <Button extend icon="plus" {...props}>
    Extend
  </Button>
)

Extend.parameters = {
  docs: {
    storyDescription:
      'This shows how to make button extensible using `extend` on Button. ⚠️ It requires an `icon`.',
  },
}
