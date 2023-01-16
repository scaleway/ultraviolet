import type { ComponentStory } from '@storybook/react'
import { Button } from '..'

export const Size: ComponentStory<typeof Button> = ({ ...props }) => (
  <>
    <Button size="large" {...props}>
      large
    </Button>
    <Button size="medium" {...props}>
      medium
    </Button>
    <Button size="small" {...props}>
      small
    </Button>
    <Button size="xsmall" {...props}>
      xsmall
    </Button>
    <Button size="xxsmall" {...props}>
      xxsmall
    </Button>
  </>
)

Size.parameters = {
  docs: {
    storyDescription: 'This shows how to use `size` on Button.',
  },
}

Size.decorators = [
  StoryComponent => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 16 }}>
      <StoryComponent />
    </div>
  ),
]
