import type { StoryFn } from '@storybook/react'
import { Loader, SIZES } from '../index'

export const Sizes: StoryFn = props => (
  <>
    {Object.keys(SIZES).map(size => (
      <Loader {...props} size={size as keyof typeof SIZES} key={size} />
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
