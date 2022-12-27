import type { DecoratorFunction } from '@storybook/addons'
import type { ComponentProps } from 'react'
import Icon, { icons } from '..'
import Stack from '../../Stack'

export const Name = (args: ComponentProps<typeof Icon>) =>
  icons.map(name => (
    <div>
      <Icon name={name} {...args} />
      &nbsp;{name}
    </div>
  ))

Name.parameters = {
  docs: {
    storyDescription: 'Set desired icon using `name` property.',
  },
}

Name.decorators = [
  Story => (
    <Stack gap={1}>
      <Story />
    </Stack>
  ),
] as DecoratorFunction<JSX.Element>[]
