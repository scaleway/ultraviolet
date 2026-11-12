import type { StoryFn } from '@storybook/react-vite'
import { capitalize } from '@ultraviolet/utils'
import { ProgressBar } from '..'
import { PROGRESS_BAR_SENTIMENTS } from '../constants'

export const Sentiments: StoryFn = props => (
  <>
    {PROGRESS_BAR_SENTIMENTS.map(sentiment => (
      <>
        {capitalize(sentiment)}:
        <ProgressBar key={sentiment} sentiment={sentiment} {...props} />
      </>
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

Sentiments.args = {
  value: 30,
}
