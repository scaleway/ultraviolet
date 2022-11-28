import { ComponentStory } from '@storybook/react'
import Button from '..'

export const Extend: ComponentStory<typeof Button> = () => (
  <Button extend icon="plus">
    Extend
  </Button>
)

Extend.parameters = {
  docs: {
    storyDescription:
      'This shows how to make button extensible using `extend` on Button. ⚠️ It requires an `icon`.',
  },
}
