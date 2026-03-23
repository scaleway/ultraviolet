import { SIZES } from '../constants'
import { Loader } from '../index'

import type { StoryFn } from '@storybook/react-vite'

export const Sizes: StoryFn = props => (
  <>
    {Object.keys(SIZES).map(size => (
      <Loader key={size} {...props} size={size as keyof typeof SIZES} />
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
