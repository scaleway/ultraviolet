import type { StoryFn } from '@storybook/react-vite'
import { DotsHorizontalIcon } from '@ultraviolet/icons/DotsHorizontalIcon'
import { Menu } from '..'
import { Button, VisuallyHidden } from '../../../index'
import { Stack } from '../../../Layout/Stack'

export const DefaultDisclosure = ({ placement }: { placement: string }) => (
  <Button sentiment="neutral" size="small" variant="ghost">
    <DotsHorizontalIcon />
    <VisuallyHidden>Open menu with placement {placement}</VisuallyHidden>
  </Button>
)

export const Placement: StoryFn<typeof Menu> = ({ ...props }) => (
  <Stack gap={3} alignItems="center">
    {(['bottom', 'top', 'right', 'left'] as const).map(placement => (
      <Stack key={placement} gap={1} alignItems="center">
        Placement {placement}:
        <Menu {...props} disclosure={<DefaultDisclosure placement={placement} />} placement={placement}>
          <Menu.Item borderless key="borderless">
            Information with a very long name. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Menu.Item>
          <Menu.Item borderless key="power on">
            Power on
          </Menu.Item>
        </Menu>
      </Stack>
    ))}
  </Stack>
)

Placement.parameters = {
  docs: {
    description: {
      story: `There are four menu placements: "top", "bottom", "left" and "right". Alignment switches when necessary to avoid overflow.
`,
    },
  },
}
