import type { StoryFn } from '@storybook/react'
import { Status, statusSentiments } from '..'
import type { Menu } from '../../Menu'

export const Sentiments: StoryFn<typeof Menu> = props => (
  <>
    {statusSentiments.map(sentiment => (
      <Status key={sentiment} sentiment={sentiment} {...props} />
    ))}
  </>
)

Sentiments.parameters = {
  docs: {
    description: { story: 'Set `sentiment` using sentiment property.' },
  },
}

Sentiments.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', gap: 16 }}>
      <StoryComponent />
    </div>
  ),
]
