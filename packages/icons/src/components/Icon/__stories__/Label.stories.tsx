import type { Decorator } from '@storybook/react-vite'
import { Stack, VisuallyHidden, Text, Tooltip, Button } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { EyeIcon } from '../__generated__'

export const Label = (args: ComponentProps<typeof EyeIcon>) => (
  <ul>
    <li>
      <Stack direction="row" alignItems="baseline" gap={1}>
        Using
        <Text as="span" variant="code">
          VisuallyHidden
        </Text>
        from
        <Text as="span" variant="code">
          @ultraviolet/ui
        </Text>
        and
        <Text as="span" variant="code">
          aria-labelledBy
        </Text>
        : <VisuallyHidden id="example-1">See</VisuallyHidden>
        <EyeIcon {...args} aria-labelledby="example-1" />
      </Stack>
    </li>
    <li>
      <Stack direction="row" alignItems="baseline" gap={1}>
        Using
        <Text as="span" variant="code">
          Tooltip
        </Text>
        from
        <Text as="span" variant="code">
          @ultraviolet/ui
        </Text>
        :
        <Tooltip relation="label" text="See">
          <EyeIcon {...args} />
        </Tooltip>
      </Stack>
    </li>
    <li>
      <Stack direction="row" alignItems="baseline" gap={1}>
        Using prop
        <Text as="span" variant="code">
          accessibleLabel
        </Text>
        : <EyeIcon {...args} accessibleLabel="See" />
      </Stack>
    </li>
    <li>
      <Stack direction="row" alignItems="baseline" gap={1}>
        No label on decorative icon:
        <Button size="small">
          See <EyeIcon {...args} />
        </Button>
      </Stack>
    </li>
  </ul>
)

Label.parameters = {
  docs: {
    description: {
      story:
        'When icons are informative, it is necessary to provide an accessible label to help users understand its meaning. There are various ways to correctly label an icon, listed here. Please choose the most adapted to your situation.',
    },
  },
}

Label.decorators = [
  Story => (
    <Stack alignItems="center" direction="row" gap={2}>
      <Story />
    </Stack>
  ),
] as Decorator[]
