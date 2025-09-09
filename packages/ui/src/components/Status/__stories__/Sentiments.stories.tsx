import type { StoryFn } from '@storybook/react-vite'
import { Status } from '..'
import { SENTIMENTS } from '../constant'

export const Sentiments: StoryFn<typeof Status> = props => (
  <>
    {SENTIMENTS.map(sentiment => (
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
