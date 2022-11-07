import { DecoratorFunction } from '@storybook/addons'
import { ComponentProps, useState } from 'react'
import SelectNumber from '..'
import Stack from '../../Stack'

const sizes: ComponentProps<typeof SelectNumber>['size'][] = [
  'large',
  'medium',
  'small',
]

export const Sizes = (props: ComponentProps<typeof SelectNumber>) => {
  const [value, setValue] = useState(0)

  return sizes.map(size => (
    <SelectNumber
      {...props}
      onChange={val => typeof val === 'number' && setValue(val)}
      value={value}
      size={size}
    >
      {size}
    </SelectNumber>
  ))
}

Sizes.decorators = [
  Story => (
    <Stack gap={2}>
      <Story />
    </Stack>
  ),
] as DecoratorFunction<JSX.Element>[]
