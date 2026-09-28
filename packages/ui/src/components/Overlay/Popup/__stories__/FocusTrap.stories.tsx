import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../../Action/Button'
import { Stack } from '../../../Layout/Stack'
import { Text } from '../../../Typography/Text'
import { Popup } from '../index'
import { Panel } from './Panel'

export const FocusTrap: StoryFn<typeof Popup> = () => (
  <Stack gap={5} width="100%">
    <Stack gap={1}>
      <Popup
        debounceDelay={0}
        text={
          <Panel title="Focus trap">
            <Stack gap={1}>
              <Text as="p" variant="bodySmall">
                Press Escape to close, Tab cycles between the two buttons below.
              </Text>
              <Stack direction="row" gap={1}>
                <Button sentiment="neutral" size="small" type="button">
                  First
                </Button>
                <Button sentiment="neutral" size="small" type="button">
                  Second
                </Button>
              </Stack>
            </Stack>
          </Panel>
        }
      >
        <Button sentiment="neutral" variant="outlined">
          Focus me
        </Button>
      </Popup>
    </Stack>
  </Stack>
)

FocusTrap.parameters = {
  docs: {
    description: {
      story:
        'The focus trap is currently coupled to `role="dialog"`. The planned API exposes a `focusTrap` prop on `Popup.Panel`, decoupled from the role, plus `initialFocus` (element to focus on open) and `returnFocus` (restore focus to the trigger on close). Note that without a visible state to move focus into the popup, the trap is mostly inert until the user tabs into it — the `initialFocus` prop of the planned API will fix this.',
    },
  },
}
