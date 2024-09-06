import type { Decorator } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import * as Icon from '..'

export const Name = (args: ComponentProps<(typeof Icon)['AddressIcon']>) =>
  Object.keys(Icon).map(name => {
    const FoundIcon = Icon[name as keyof typeof Icon]

    return (
      <div>
        <FoundIcon {...args} key={name} />
        &nbsp;{name}
      </div>
    )
  })

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
