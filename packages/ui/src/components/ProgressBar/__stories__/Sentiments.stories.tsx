import type { StoryFn } from '@storybook/react-vite'
import { progressBarSentiments } from '..'
import UncontrolledProgressBar from './UncontrolledProgressBar'

export const Sentiments: StoryFn = props => (
  <>
    {progressBarSentiments.map(sentiment => (
      <UncontrolledProgressBar
        key={sentiment}
        sentiment={sentiment}
        {...props}
      />
    ))}
  </>
)

Sentiments.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]

Sentiments.parameters = {
  docs: {
    description: { story: 'Set sentiment using `sentiment` prop.' },
  },
}
