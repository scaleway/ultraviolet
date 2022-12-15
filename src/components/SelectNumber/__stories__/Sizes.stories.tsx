import type { DecoratorFunction } from '@storybook/addons'
import type { ComponentProps } from 'react'
import SelectNumber from '..'
import Stack from '../../Stack'

const sizes: ComponentProps<typeof SelectNumber>['size'][] = [
  'large',
  'medium',
  'small',
]

export const Sizes = (props: ComponentProps<typeof SelectNumber>) =>
  sizes.map(size => <SelectNumber {...props} size={size} />)

Sizes.decorators = [
  Story => (
    <Stack gap={2}>
      <Story />
    </Stack>
  ),
] as DecoratorFunction<JSX.Element>[]
