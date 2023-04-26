import type { Story } from '@storybook/react'
import { Bullet } from '..'

export const Text: Story = props => <Bullet {...props} text="A" />

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
