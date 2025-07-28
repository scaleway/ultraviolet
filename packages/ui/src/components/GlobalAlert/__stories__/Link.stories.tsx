import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { GlobalAlert } from '../index'

export const Link = (props: ComponentProps<typeof GlobalAlert>) => (
  <Stack gap={1}>
    <GlobalAlert {...props} variant="danger">
      The credit card registered in your account expires soon.&nbsp;
      <GlobalAlert.Link href="scaleway.com">
        Update your payment method
      </GlobalAlert.Link>
      &nbsp; to keep using your resources.
    </GlobalAlert>
  </Stack>
)

Link.decorators = [
  StoryComponent => (
    <Stack gap={2}>
      <StoryComponent />
    </Stack>
  ),
] as Decorator[]
