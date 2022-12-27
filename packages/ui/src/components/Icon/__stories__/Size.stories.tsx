import type { DecoratorFunction } from '@storybook/addons'
import type { ComponentProps } from 'react'
import Icon from '..'
import Stack from '../../Stack'

const sizes: ComponentProps<typeof Icon>['size'][] = [40, 50, 60]

export const Size = (args: ComponentProps<typeof Icon>) =>
  sizes.map(size => <Icon key={size} name="eye" size={size} {...args} />)

Size.parameters = {
  docs: {
    storyDescription: 'Set size using `size` property.',
  },
}

Size.decorators = [
  Story => (
    <Stack gap={2} alignItems="center" direction="row">
      <Story />
    </Stack>
  ),
] as DecoratorFunction<JSX.Element>[]
