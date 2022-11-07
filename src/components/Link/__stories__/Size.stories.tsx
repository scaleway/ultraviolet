import { DecoratorFunction } from '@storybook/addons'
import { ComponentProps } from 'react'
import Link from '..'
import Stack from '../../Stack'

const sizes: ComponentProps<typeof Link>['size'][] = ['large', 'small']

export const Size = (props: ComponentProps<typeof Link>) =>
  sizes.map(size => (
    <Link {...props} key={size} size={size}>
      {size}
    </Link>
  ))

Size.decorators = [
  Story => (
    <Stack>
      <Story />
    </Stack>
  ),
] as DecoratorFunction<JSX.Element>[]
