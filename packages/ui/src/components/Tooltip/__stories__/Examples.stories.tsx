import type { Decorator } from '@storybook/react-vite'
import { HelpCircleOutlineIcon, InformationIcon, SettingsOutlineIcon } from '@ultraviolet/icons'
import { Tooltip } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

export const Examples = () => (
  <>
    <Tooltip text="Information">
      <InformationIcon prominence="weak" sentiment="neutral" />
    </Tooltip>
    <Tooltip text="Label">
      <Button size="medium" sentiment="neutral" variant="ghost">
        <HelpCircleOutlineIcon size="medium" />
      </Button>
    </Tooltip>
    <Tooltip text="Description">
      {props => (
        <Button {...props} size="medium" variant="outlined">
          <SettingsOutlineIcon size="small" /> Settings
        </Button>
      )}
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
