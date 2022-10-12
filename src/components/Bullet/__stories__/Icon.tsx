import { Story } from '@storybook/react'
import Bullet from '..'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Icon: Story = _props => (
  <>
    <Bullet icon="check" />
    <Bullet icon="check" variant="success" />
    <Bullet icon="check" variant="success" size="small" />
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
