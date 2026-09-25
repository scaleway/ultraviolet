import type { StoryFn } from '@storybook/react-vite'
import { useCallback, useState } from 'react'
import { Button } from '../../../Action/Button'
import { Stack } from '../../../Layout/Stack'
import { Text } from '../../../Typography/Text'
import { Popup } from '../index'
import { Panel } from './Panel'

export const Controlled: StoryFn<typeof Popup> = () => {
  const [visible, setVisible] = useState(false)

  const onCloseCallBack = useCallback(() => {
    setVisible(false)
  }, [])

  return (
    <Stack gap={5} width="100%">
      <Stack gap={1}>
        <Text as="p" variant="bodyStrong">
          Uncontrolled (default hover behavior):
        </Text>
        <Popup debounceDelay={0} text={<Panel title="Uncontrolled">No `visible` prop provided, opens on hover.</Panel>}>
          <Button sentiment="neutral" variant="outlined">
            Hover me
          </Button>
        </Popup>
      </Stack>

      <Stack gap={1}>
        <Text as="p" variant="bodyStrong">
          Controlled (`visible` prop):
        </Text>
        <Popup
          debounceDelay={0}
          hideOnClickOutside
          onClose={onCloseCallBack}
          text={
            <Panel onClose={onCloseCallBack} title="Controlled">
              Controlled by the `visible` state. The consumer owns the state and popup fires `onClose` when dismissed.
            </Panel>
          }
          visible={visible}
        >
          <Button onClick={() => setVisible(prev => !prev)} sentiment="neutral" variant="outlined">
            Toggle popup
          </Button>
        </Popup>
      </Stack>
    </Stack>
  )
}

Controlled.parameters = {
  docs: {
    description: {
      story:
        'The current API supports both modes with a single `visible` prop: when provided the popup is controlled, otherwise it reacts to hover. The planned API splits this into `visible` (controlled) and `defaultVisible` (uncontrolled initial state) on `Popup.Root`.',
    },
  },
}
