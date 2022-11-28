import { ComponentStory } from '@storybook/react'
import Button from '..'

export const Size: ComponentStory<typeof Button> = () => (
  <>
    <Button size="large">large</Button>
    <Button size="medium">medium</Button>
    <Button size="small">small</Button>
    <Button size="xsmall">xsmall</Button>
    <Button size="xxsmall">xxsmall</Button>
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
