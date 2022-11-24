import { DecoratorFunction } from '@storybook/addons'
import { ComponentProps } from 'react'
import Link from '..'
import { SENTIMENTS } from '../../../theme'
import Stack from '../../Stack'

export const Variants = (props: ComponentProps<typeof Link>) =>
  SENTIMENTS.map(variant => (
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
] as DecoratorFunction<JSX.Element>[]
