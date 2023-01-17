import type { Story } from '@storybook/react'
import { Loader } from '../index'

export const Percentages: Story = props => (
  <>
    {[8, 32, 50, 75, 90, 100].map(percentage => (
      <Loader {...props} percentage={percentage} key={percentage} />
    ))}
  </>
)

Percentages.parameters = {
  docs: {
    storyDescription:
      'You can set the percentage of completion with the `percentage` prop.',
  },
}
