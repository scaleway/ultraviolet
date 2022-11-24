import { Story } from '@storybook/react'
import { colors } from '../../../theme'
import Loader from '../index'

export const TrailColor: Story = props => (
  <>
    {[...Object.keys(colors), 'tomato', '#6EB5FF'].map(trailColor => (
      <Loader {...props} trailColor={trailColor} key={trailColor} />
    ))}
  </>
)

TrailColor.parameters = {
  docs: {
    storyDescription:
      'You can set the trail color (background) of the component by using the `trailColor` prop. You can use theme color or a custom one.',
  },
}
