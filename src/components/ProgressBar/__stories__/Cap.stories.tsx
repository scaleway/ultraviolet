import { Story } from '@storybook/react'
import ProgressBar from '..'

export const Cap: Story = props => (
  <>
    <ProgressBar value={600} {...props} />
    <ProgressBar value={-600} {...props} />
  </>
)

Cap.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]

Cap.parameters = {
  docs: {
    storyDescription:
      'Value will be capped out above 0 and below 100, so you&apos;re safe to pass an even greater/lower value',
  },
}
