import type { Decorator } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Icon } from '..'

const sizes: ComponentProps<typeof Icon>['size'][] = [40, 50, 60]

export const Size = (args: ComponentProps<typeof Icon>) => (
  <Stack>
    <Stack direction="row" gap={3}>
      <Icon name="eye" size="small" {...args} /> small
    </Stack>
    <Stack direction="row" gap={3}>
      <Icon name="eye" size="large" {...args} /> large
    </Stack>
    {sizes.map(size => (
      <Stack direction="row" gap={3}>
        <Icon key={size} name="eye" size={size} {...args} /> {size}px
      </Stack>
    ))}
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
