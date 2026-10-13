import type { StoryFn } from '@storybook/react-vite'
import { Badge } from '..'

export const AccessibleLabel: StoryFn = () => (
  <Badge sentiment="warning" accessibleLabel="Status: warning">
    Not saved
  </Badge>
)

AccessibleLabel.parameters = {
  docs: {
    description: {
      story:
        '`accessibleLabel` renders a visually hidden text that is read by screen readers. Use it to provide context that is not visible.',
    },
  },
}
