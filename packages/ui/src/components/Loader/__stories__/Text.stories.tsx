import type { StoryFn } from '@storybook/react'
import { Loader } from '../index'

export const Text: StoryFn = props => (
  <>
    {[0, 25, 50, 75, 100].map(percentage => (
      <Loader
        {...props}
        percentage={percentage}
        text={`${percentage}%`}
        key={percentage}
      />
    ))}
  </>
)

Text.parameters = {
  docs: {
    description: {
      story:
        'You can pass a text which will be inlined in the center of the circle with the `text` prop.',
    },
  },
}
