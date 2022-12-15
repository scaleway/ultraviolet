import type { Story } from '@storybook/react'
import Bullet from '..'

export const Icon: Story = props => (
  <>
    <Bullet {...props} icon="check" />
    <Bullet {...props} icon="check" variant="success" />
    <Bullet {...props} icon="check" variant="success" size="small" />
  </>
)

Icon.parameters = {
  docs: {
    storyDescription:
      'Set `icon` using icon property. Variant and size props affect icon.',
  },
}

Icon.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
