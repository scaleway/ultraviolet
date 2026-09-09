import type { StoryFn } from '@storybook/react-vite'
import { PencilIcon } from '@ultraviolet/icons/PencilIcon'
import { Button } from '..'
import { Stack, Text } from '../../..'

export const Tooltip: StoryFn<typeof Button> = () => (
  <Stack gap={2}>
    <Stack direction="row" gap={2}>
      <Button tooltipDescription="Opens the edit dialog">
        <PencilIcon />
        Edit
      </Button>
      <Button accessibleLabel="Edit" tooltipDescription="Opens the edit dialog">
        <PencilIcon />
      </Button>
    </Stack>
    <Text as="p" variant="bodySmall">
      The <code>tooltipDescription</code> prop renders the text inside a Tooltip whose content is the button accessible
      description.
    </Text>
    <Stack direction="row" gap={2}>
      <Button tooltipLabel="Edit profile">
        <PencilIcon />
      </Button>
    </Stack>
    <Text as="p" variant="bodySmall">
      The <code>tooltipLabel</code> prop renders the text inside a Tooltip whose content is the button accessible label.
    </Text>
  </Stack>
)

Tooltip.parameters = {
  docs: {
    description: {
      story:
        'Use `tooltipLabel` to set the accessible name via a Tooltip, or `tooltipDescription` to provide an auxiliary description. Prefer these over the deprecated `tooltip` prop. Hover or focus the buttons to see the tooltips.',
    },
  },
}
