import type { Decorator } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Icon, icons } from '..'

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
] as Decorator[]
