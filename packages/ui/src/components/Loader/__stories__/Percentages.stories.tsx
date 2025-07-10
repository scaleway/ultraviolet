import type { StoryFn } from '@storybook/react-vite'
import { Loader } from '../index'

export const Percentages: StoryFn = props => (
  <>
    {[8, 32, 50, 75, 90, 100].map(percentage => (
      <Loader {...props} percentage={percentage} key={percentage} />
    ))}
  </>
)

Percentages.parameters = {
  docs: {
    description: {
      story:
        'You can set the percentage of completion with the `percentage` prop.',
    },
  },
}
