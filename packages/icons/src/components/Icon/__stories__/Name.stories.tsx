import type { Decorator } from '@storybook/react'
import { Snippet, Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import * as Icon from '..'

export const Name = (args: ComponentProps<(typeof Icon)['AddressIcon']>) =>
  Object.keys(Icon).map(name => {
    const FoundIcon = Icon[name as keyof typeof Icon]

    return (
      <Stack direction="row" gap={1} alignItems="center">
        <FoundIcon {...args} key={name} />
        <Snippet>{`import { ${name} } from '@ultraviolet/icons'`}</Snippet>
      </Stack>
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
