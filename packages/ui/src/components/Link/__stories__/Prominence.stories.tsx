import type { DecoratorFunction } from '@storybook/addons'
import type { ComponentProps } from 'react'
import { Link, PROMINENCES } from '..'
import type { ProminenceProps } from '..'
import { Stack } from '../../Stack'

export const Prominence = (props: ComponentProps<typeof Link>) =>
  Object.keys(PROMINENCES).map(prominence => (
    <Link
      {...props}
      key={prominence}
      prominence={prominence as ProminenceProps}
    >
      {prominence}
    </Link>
  ))

Prominence.decorators = [
  StoryComponent => (
    <Stack>
      <StoryComponent />
    </Stack>
  ),
] as DecoratorFunction<JSX.Element>[]
