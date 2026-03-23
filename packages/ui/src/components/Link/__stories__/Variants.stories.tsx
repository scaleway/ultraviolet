import { Link } from '..'
import { Stack } from '../../Stack'

import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Variants = (props: ComponentProps<typeof Link>) =>
  (['inline', 'standalone'] as const).map(variant => (
    <Link key={variant} {...props} variant={variant}>
      {variant}
    </Link>
  ))

Variants.decorators = [
  StoryComponent => (
    <Stack>
      <StoryComponent />
    </Stack>
  ),
] as Decorator[]
