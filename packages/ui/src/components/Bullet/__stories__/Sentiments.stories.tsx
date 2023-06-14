import type { StoryFn } from '@storybook/react'
import { Bullet, bulletSentiments } from '..'

export const Sentiments: StoryFn = props => (
  <>
    {bulletSentiments.map(sentiment => (
      <Bullet {...props} key={sentiment} sentiment={sentiment} text="1" />
    ))}
  </>
)

Sentiments.parameters = {
  docs: {
    storyDescription:
      'Sentiment defines different colors of your component. You can define it using `Sentiment` property.',
  },
}

Sentiments.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
