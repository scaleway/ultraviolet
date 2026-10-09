import { theme } from '@ultraviolet/themes'
import { Button } from '../../../../Action/Button'
import { Stack } from '../../../../Layout/Stack'
import { Text } from '../../../../Typography/Text'
import { Popup } from '../index'

export const Playground = () => (
  <Popup.Root>
    <Popup.Trigger>
      <Button sentiment="neutral" variant="outlined">
        Open Popup
      </Button>
    </Popup.Trigger>
    <Popup.Panel aria-labelledby="demo-title">
      <Stack gap={1} style={{ padding: theme.space['2'] }}>
        <Text id="demo-title" as="p" variant="bodyStrong">
          Demo Popup
        </Text>
        <Text as="p" variant="bodySmall">
          Click to open, Escape or click outside to dismiss.
        </Text>
      </Stack>
    </Popup.Panel>
  </Popup.Root>
)
