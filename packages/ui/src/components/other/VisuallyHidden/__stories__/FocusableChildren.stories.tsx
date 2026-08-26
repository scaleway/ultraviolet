import type { StoryFn } from '@storybook/react-vite'
import { VisuallyHidden } from '..'
import { Link } from '../../../action/Link'
import { Stack } from '../../../layout/Stack'

export const FocusableChildren: StoryFn<typeof VisuallyHidden> = props => (
  <Stack gap={2} width="fit-content">
    Tab to focus on VisuallyHidden content
    <VisuallyHidden {...props} as="p">
      With a link in child:
      <Link href="www.scaleway.com">scaleway.com</Link>
    </VisuallyHidden>
    <VisuallyHidden {...props} tabIndex={0}>
      With tabIndex. It can be used for skip links.
    </VisuallyHidden>
    <VisuallyHidden {...props} as="button" onClick={() => alert('clicked')}>
      As a focusable element. It can also be used for skip links.
    </VisuallyHidden>
  </Stack>
)

FocusableChildren.parameters = {
  docs: {
    description: {
      story:
        'When the `as` prop is a focusable element (e.g., `a`, `button`) or when `tabIndex` is set, the VisuallyHidden content becomes visible on focus. This is useful for "skip links" or other accessibility patterns where content should only appear when focused.',
    },
  },
}
