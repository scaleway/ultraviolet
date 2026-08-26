import type { Decorator } from '@storybook/react-vite'
import { HelpCircleOutlineIcon, InformationIcon, SettingsOutlineIcon } from '@ultraviolet/icons'
import { Tooltip } from '..'
import { Button } from '../../../action/Button'
import { Stack } from '../../../layout/Stack'

export const Examples = () => (
  <>
    <Tooltip text="Information" relation="label">
      <InformationIcon prominence="weak" sentiment="neutral" />
    </Tooltip>

    <Tooltip text="Label" relation="label">
      <Button size="medium" sentiment="neutral" variant="ghost">
        <HelpCircleOutlineIcon size="medium" />
      </Button>
    </Tooltip>

    <Tooltip text="Description">
      <Button size="medium" variant="outlined">
        <SettingsOutlineIcon size="small" /> Settings
      </Button>
    </Tooltip>
  </>
)

Examples.decorators = [
  Story => (
    <Stack direction="row" alignItems={'center'} gap={3} style={{ margin: '1rem' }}>
      <Story />
    </Stack>
  ),
] as Decorator[]
