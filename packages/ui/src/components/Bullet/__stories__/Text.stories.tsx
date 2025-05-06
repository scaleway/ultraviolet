import type { StoryFn } from '@storybook/react'
import { Bullet } from '..'

export const Text: StoryFn = props => <Bullet {...props}>A</Bullet>

Text.parameters = {
  docs: {
    description: {
      story:
        'Set `text` using text property. Sentiment and size props affect text.',
    },
  },
}

Text.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
