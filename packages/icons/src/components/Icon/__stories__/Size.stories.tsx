import type { Decorator } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Eye } from '..'

export const Size = (args: ComponentProps<typeof Eye>) => (
  <Stack>
    <Stack direction="row" alignItems="center" gap={3}>
      <Eye size="small" {...args} /> small
    </Stack>
    <Stack direction="row" gap={3} alignItems="center">
      <Eye size="large" {...args} /> large
    </Stack>
    <Stack direction="row" gap={3} alignItems="center">
      <Eye size="xlarge" {...args} /> xlarge
    </Stack>
    <Stack direction="row" gap={3} alignItems="center">
      <Eye size="xxlarge" {...args} /> xxlarge
    </Stack>
  </Stack>
)

Size.parameters = {
  docs: {
    description: { story: 'Set size using `size` property.' },
  },
}

Size.decorators = [
  Story => (
    <Stack gap={2} alignItems="center" direction="row">
      <Story />
    </Stack>
  ),
] as Decorator[]
