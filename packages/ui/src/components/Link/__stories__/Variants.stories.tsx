import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { Link } from '..'

export const Variants = (props: ComponentProps<typeof Link>) =>
  (['inline', 'standalone'] as const).map(variant => (
    <Link {...props} key={variant} variant={variant}>
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
