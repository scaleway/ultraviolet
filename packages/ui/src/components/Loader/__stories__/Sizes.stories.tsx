import type { StoryFn } from '@storybook/react'
import { Loader } from '../index'

export const Sizes: StoryFn = props => (
  <>
    {[8, 32, 50, 75, 90, 100].map(size => (
      <Loader {...props} size={size} key={size} />
    ))}
  </>
)

Sizes.parameters = {
  docs: {
    description: {
      story: 'You can set the size of the component with the `size` prop.',
    },
  },
}
