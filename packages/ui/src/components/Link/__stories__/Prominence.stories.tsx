import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Link } from '..'
import type { ProminenceProps } from '..'
import { Stack } from '../../Stack'
import { PROMINENCES } from '../constants'

export const Prominence = (props: ComponentProps<typeof Link>) =>
  Object.keys(PROMINENCES).map(prominence => (
    <Link key={prominence} {...props} prominence={prominence as ProminenceProps}>
      {prominence}
    </Link>
  ))

Prominence.decorators = [
  StoryComponent => (
    <Stack>
      <StoryComponent />
    </Stack>
  ),
] as Decorator[]
