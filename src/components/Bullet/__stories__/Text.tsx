import { Story } from '@storybook/react'
import Bullet from '..'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Text: Story = _props => (
  <>
    <Bullet text="1" />
    <Bullet text="1" variant="success" />
    <Bullet text="1" size="small" />
  </>
)

Text.parameters = {
  docs: {
    storyDescription:
      'Set `text` using text property. Variant and size props affect text.',
  },
}

Text.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
