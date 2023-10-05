import type { StoryFn } from '@storybook/react'
import { Bullet } from '..'

export const Icon: StoryFn = props => (
  <>
    <Bullet {...props} icon="check" />
    <Bullet {...props} icon="check" sentiment="success" />
    <Bullet {...props} icon="check" sentiment="success" size="small" />
  </>
)

Icon.parameters = {
  docs: {
    description: {
      story:
        'Set `icon` using icon property. Sentiment and size props affect icon.',
    },
  },
}

Icon.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
