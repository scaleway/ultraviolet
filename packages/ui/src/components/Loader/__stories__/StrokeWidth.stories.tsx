import type { StoryFn } from '@storybook/react'
import { Loader } from '../index'

export const StrokeWidth: StoryFn = props => (
  <>
    {[2, 8, 16, 24].map(strokeWidth => (
      <Loader {...props} strokeWidth={strokeWidth} key={strokeWidth} />
    ))}
  </>
)

StrokeWidth.parameters = {
  docs: {
    description: {
      story: 'You can also set the stroke width with the `strokeWidth` prop.',
    },
  },
}
