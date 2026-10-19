import type { StoryFn } from '@storybook/react-vite'
import { Badge } from '..'
import { VisuallyHidden } from '../../../Other/VisuallyHidden'

export const AccessibleLabel: StoryFn = () => (
  <Badge sentiment="warning">
    <VisuallyHidden>Status: warning</VisuallyHidden>
    Not saved
  </Badge>
)

AccessibleLabel.parameters = {
  docs: {
    description: {
      story:
        'Use component `VisuallyHidden` to render a visually hidden text that is read by screen readers. Use it to provide context that is not visible.',
    },
  },
}
