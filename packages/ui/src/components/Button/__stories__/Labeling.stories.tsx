import type { StoryFn } from '@storybook/react-vite'
import { PencilIcon } from '@ultraviolet/icons/PencilIcon'
import { Button } from '..'
import { Stack, Text } from '../..'

export const Labeling: StoryFn<typeof Button> = () => (
  <Stack gap={2}>
    <Stack gap={1} alignItems={'start'}>
      <Button accessibleLabel="Edit profile">
        <PencilIcon />
      </Button>
      <Text as="p" variant="bodySmall">
        <code>accessibleLabel</code>: renders a <code>VisuallyHidden</code> element inside the button. The text becomes
        the accessible name. Prefer this over the deprecated <code>aria-label</code> prop.
      </Text>
    </Stack>

    <Stack gap={1}>
      <Button tooltipLabel="Edit profile">
        <PencilIcon />
      </Button>
      <Text as="p" variant="bodySmall">
        <code>tooltipLabel</code>: the tooltip text becomes the accessible name (<code>aria-labelledby</code>). Use for
        icon-only buttons that display a tooltip.
      </Text>
    </Stack>

    <Stack gap={1}>
      <Button tooltipDescription="Opens the edit dialog">
        <PencilIcon />
        Edit
      </Button>
      <Text as="p" variant="bodySmall">
        <code>tooltipDescription</code>: the tooltip text becomes the accessible description (
        <code>aria-describedby</code>). The button still needs an accessible name (here the visible text). Use to
        provide auxiliary information.
      </Text>
    </Stack>

    <Stack gap={1}>
      <Button accessibleLabel="Edit profile" tooltipDescription="Opens the edit dialog">
        <PencilIcon />
      </Button>
      <Text as="p" variant="bodySmall">
        <code>accessibleLabel</code> + <code>tooltipDescription</code>: an icon-only button with both an accessible name
        and an auxiliary description shown on hover.
      </Text>
    </Stack>
  </Stack>
)

Labeling.parameters = {
  docs: {
    description: {
      story:
        'Several props are available to label a button or provide a description:\n- `accessibleLabel`: accessible name rendered in a `VisuallyHidden` element (replaces the deprecated `aria-label`).\n- `tooltipLabel`: tooltip text used as the accessible name (`label` relation).\n- `tooltipDescription`: tooltip text used as the accessible description (`description` relation, replaces the deprecated `tooltip` prop).',
    },
  },
}
