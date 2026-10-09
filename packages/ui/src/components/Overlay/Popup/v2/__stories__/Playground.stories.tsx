import { Button } from '../../../../Action/Button'
import { Stack } from '../../../../Layout/Stack'
import { Text } from '../../../../Typography/Text'
import { PopupV2 } from '../index'

export const Playground = () => (
  <PopupV2.Root>
    <PopupV2.Trigger>
      <Button sentiment="neutral" variant="outlined">
        Open Popup
      </Button>
    </PopupV2.Trigger>
    <PopupV2.Panel>
      <Stack gap={1}>
        <Text as="p" variant="bodySmall">
          This is the new compound Popup built on @floating-ui/react.
        </Text>
        <Text as="p" variant="bodySmall">
          It demos click-to-open, Escape and outside-click dismissal out of the box.
        </Text>
      </Stack>
    </PopupV2.Panel>
  </PopupV2.Root>
)
