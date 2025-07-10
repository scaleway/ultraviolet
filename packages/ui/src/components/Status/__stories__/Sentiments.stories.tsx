import type { StoryFn } from '@storybook/react-vite'
import { Status, statusSentiments } from '..'

export const Sentiments: StoryFn<typeof Status> = props => (
  <>
    {statusSentiments.map(sentiment => (
      <Status key={sentiment} {...props} sentiment={sentiment} />
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
