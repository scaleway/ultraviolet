import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Link } from '..'
import { Stack } from '../../Stack'

export const Primary = (props: ComponentProps<typeof Link>) => (
  <Stack direction="column">
    <Link {...props} sentiment="primary">
      Primary link
    </Link>
    <Link {...props}>Default link</Link>
  </Stack>
)

Primary.decorators = [
  StoryComponent => (
    <Stack>
      <StoryComponent />
    </Stack>
  ),
] as Decorator[]

Primary.parameters = {
  docs: {
    description: {
      story:
        'The `sentiment` prop should only be used with the `primary` value. Other values are deprecated and will be removed in the next major version.',
    },
  },
}
