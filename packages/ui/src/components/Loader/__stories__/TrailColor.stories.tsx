import type { StoryFn } from '@storybook/react'
import { colors } from '../../../theme'
import { Loader } from '../index'

export const TrailColor: StoryFn = props => (
  <>
    {[...Object.keys(colors), 'tomato', '#6EB5FF'].map(trailColor => (
      <Loader {...props} trailColor={trailColor} key={trailColor} />
    ))}
  </>
)

TrailColor.parameters = {
  docs: {
    description: {
      story:
        'You can set the trail color (background) of the component by using the `trailColor` prop. You can use theme color or a custom one.',
    },
  },
}
