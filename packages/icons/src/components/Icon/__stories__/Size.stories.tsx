import type { Decorator } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { EyeIcon } from '../__generated__'

export const Size = (args: ComponentProps<typeof EyeIcon>) => (
  <Stack>
    <Stack direction="row" alignItems="center" gap={3}>
      <EyeIcon size="xsmall" {...args} /> xsmall
    </Stack>
    <Stack direction="row" alignItems="center" gap={3}>
      <EyeIcon size="small" {...args} /> small
    </Stack>
    <Stack direction="row" alignItems="center" gap={3}>
      <EyeIcon size="medium" {...args} /> medium
    </Stack>
    <Stack direction="row" gap={3} alignItems="center">
      <EyeIcon size="large" {...args} /> large
    </Stack>
    <Stack direction="row" gap={3} alignItems="center">
      <EyeIcon size="xlarge" {...args} /> xlarge
    </Stack>
    <Stack direction="row" gap={3} alignItems="center">
      <EyeIcon size="xxlarge" {...args} /> xxlarge
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
