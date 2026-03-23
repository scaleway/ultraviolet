import { Stack } from '@ultraviolet/ui'

import { EyeIcon } from '../__generated__'

import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Size = (args: ComponentProps<typeof EyeIcon>) => (
  <Stack>
    <Stack alignItems="center" direction="row" gap={3}>
      <EyeIcon size="xsmall" {...args} /> xsmall
    </Stack>
    <Stack alignItems="center" direction="row" gap={3}>
      <EyeIcon size="small" {...args} /> small
    </Stack>
    <Stack alignItems="center" direction="row" gap={3}>
      <EyeIcon size="medium" {...args} /> medium
    </Stack>
    <Stack alignItems="center" direction="row" gap={3}>
      <EyeIcon size="large" {...args} /> large
    </Stack>
    <Stack alignItems="center" direction="row" gap={3}>
      <EyeIcon size="xlarge" {...args} /> xlarge
    </Stack>
    <Stack alignItems="center" direction="row" gap={3}>
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
    <Stack alignItems="center" direction="row" gap={2}>
      <Story />
    </Stack>
  ),
] as Decorator[]
