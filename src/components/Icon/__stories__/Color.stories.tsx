import { DecoratorFunction } from '@storybook/addons'
import { ComponentProps } from 'react'
import Icon from '..'
import Stack from '../../Stack'

const colors: ComponentProps<typeof Icon>['color'][] = [
  'primary',
  'success',
  'warning',
]

export const Color = (args: ComponentProps<typeof Icon>) =>
  colors.map(color => <Icon key={color} name="eye" color={color} {...args} />)

Color.parameters = {
  docs: {
    storyDescription: 'Set size using `size` property.',
  },
}

Color.decorators = [
  Story => (
    <Stack gap={2} alignItems="center" direction="row">
      <Story />
    </Stack>
  ),
] as DecoratorFunction<JSX.Element>[]
