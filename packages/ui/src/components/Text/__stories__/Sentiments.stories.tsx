import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { SENTIMENTS } from '../../../theme'
import { Text } from '../index'

export const Sentiments: StoryFn<ComponentProps<typeof Text>> = () => (
  <div>
    {SENTIMENTS.map(sentiment => (
      <Text key={sentiment} as="div" variant="body" sentiment={sentiment}>
        This text uses {sentiment} sentiment.
      </Text>
    ))}
  </div>
)
Sentiments.parameters = {
  docs: {
    description: {
      story:
        'Set a sentiment using `sentiment` property. (`color` prop is deprecated but still works and has the same effect)',
    },
  },
}
