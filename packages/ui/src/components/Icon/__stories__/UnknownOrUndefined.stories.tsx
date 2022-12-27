import type { DecoratorFunction } from '@storybook/addons'
import type { ComponentProps } from 'react'
import Icon from '..'
import Stack from '../../Stack'

export const UnknownOrUndefined = (args: ComponentProps<typeof Icon>) => [
  <Icon name={undefined} color="danger" {...args} />,
  /* @ts-expect-error we test an unknown icon name */
  <Icon name="unknown" color="warning" {...args} />,
]

UnknownOrUndefined.parameters = {
  docs: {
    storyDescription:
      'If name is `undefined` or not found warning is sent and default circle icon is displayed.',
  },
}

UnknownOrUndefined.decorators = [
  Story => (
    <Stack gap={2} alignItems="center" direction="row">
      <Story />
    </Stack>
  ),
] as DecoratorFunction<JSX.Element>[]
