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
    <Popup.Panel>
      <Stack gap={1}>
        <Text as="p" variant="bodySmall">
          This is the new compound Popup built on @floating-ui/react.
        </Text>
        <Text as="p" variant="bodySmall">
          It demos click-to-open, Escape and outside-click dismissal out of the box.
        </Text>
      </Stack>
    </Popup.Panel>
  </Popup.Root>
)
