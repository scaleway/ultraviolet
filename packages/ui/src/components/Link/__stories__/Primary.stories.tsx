import type { Decorator } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Link } from '..'
import { Stack } from '../../Stack'

export const Primary = (props: ComponentProps<typeof Link>) => (
  <Stack direction="column">
    <Link {...props} primary>
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
