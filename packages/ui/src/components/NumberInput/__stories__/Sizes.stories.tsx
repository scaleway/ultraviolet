import type { DecoratorFunction } from '@storybook/addons'
import type { ComponentProps } from 'react'
import { NumberInput } from '..'
import { Stack } from '../../Stack'

const sizes: ComponentProps<typeof NumberInput>['size'][] = [
  'large',
  'medium',
  'small',
]

export const Sizes = (props: ComponentProps<typeof NumberInput>) =>
  sizes.map(size => <NumberInput {...props} size={size} />)

Sizes.decorators = [
  Story => (
    <Stack gap={2}>
      <Story />
    </Stack>
  ),
] as DecoratorFunction<JSX.Element>[]
