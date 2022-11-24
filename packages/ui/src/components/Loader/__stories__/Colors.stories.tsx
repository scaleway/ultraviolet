import { Story } from '@storybook/react'
import { colors } from '../../../theme'
import Loader from '../index'

export const Colors: Story = props => (
  <>
    {[...Object.keys(colors), 'tomato', '#6EB5FF'].map(color => (
      <Loader {...props} color={color} key={color} />
    ))}
  </>
)

Colors.parameters = {
  docs: {
    storyDescription:
      'You can set the color of the component with the `color` prop.',
  },
}
