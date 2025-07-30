import type { StoryFn } from '@storybook/react-vite'
import { SENTIMENTS } from '../../../theme'
import { Badge } from '..'

export const Sentiments: StoryFn = props => (
  <>
    {SENTIMENTS.map(sentiment => (
      <Badge key={sentiment} {...props} sentiment={sentiment}>
        {sentiment}
      </Badge>
    ))}
  </>
)

Sentiments.parameters = {
  docs: {
    description: {
      story:
        'Sentiment defines different colors of your component. You can define it using `sentiment` property.',
    },
  },
}

Sentiments.args = {
  children: [],
}

Sentiments.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
