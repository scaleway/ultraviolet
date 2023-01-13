import type { ComponentStory } from '@storybook/react'
import Button from '..'

export const Extend: ComponentStory<typeof Button> = ({ ...props }) => (
  <>
    <Button icon="plus" extend {...props}>
      Extend button !
    </Button>
    <Button icon="plus" href="https://scaleway.com" extend {...props}>
      Extend button with Link !
    </Button>
  </>
)

Extend.parameters = {
  docs: {
    storyDescription:
      'This shows how to make button extensible using `extend` on Button. ⚠️ It requires an `icon`.',
  },
}
