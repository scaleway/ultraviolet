import type { Decorator } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Icon } from '..'
import { icons } from '../legacy'

export const Name = (args: ComponentProps<typeof Icon>) =>
  icons.map(name => (
    <div>
      <Icon {...args} name={name} key={name} />
      &nbsp;{name}
    </div>
  ))

Name.parameters = {
  docs: {
    description: { story: 'Set desired icon using `name` property.' },
  },
}

Name.decorators = [
  Story => (
    <Stack gap={1}>
      <Story />
    </Stack>
  ),
] as Decorator[]
