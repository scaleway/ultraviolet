import type { Decorator } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Icon } from '..'

export const UnknownOrUndefined = (args: ComponentProps<typeof Icon>) => [
  <Icon name={undefined} color="danger" {...args} />,
  /* @ts-expect-error we test an unknown icon name */
  <Icon name="unknown" color="warning" {...args} />,
]

UnknownOrUndefined.parameters = {
  docs: {
    description: {
      story:
        'If name is `undefined` or not found warning is sent and default circle icon is displayed.',
    },
  },
}

UnknownOrUndefined.decorators = [
  Story => (
    <Stack gap={2} alignItems="center" direction="row">
      <Story />
    </Stack>
  ),
] as Decorator[]
