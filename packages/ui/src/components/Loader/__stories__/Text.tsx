import type { Story } from '@storybook/react'
import { Loader } from '../index'

export const Text: Story = props => (
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
    storyDescription:
      'You can pass a text which will be inlined in the center of the circle with the `text` prop.',
  },
}
