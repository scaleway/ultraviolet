import type { StoryFn } from '@storybook/react-vite'
import { useCallback, useState } from 'react'
import { Button } from '../../../Action/Button'
import { Stack } from '../../../Layout/Stack'
import { Text } from '../../../Typography/Text'
import { Popup } from '../index'
import { Panel } from './Panel'

export const Trigger: StoryFn<typeof Popup> = () => {
  const [visible, setVisible] = useState(false)

  const onCloseCallBack = useCallback(() => {
    setVisible(false)
  }, [])

  return (
    <Stack gap={5} width="100%">
      <Stack gap={1}>
        <Text as="p" variant="bodyStrong">
          Hover trigger:
        </Text>
        <Popup debounceDelay={0} text={<Panel title="Hover trigger">Triggered by hover.</Panel>}>
          <Button sentiment="neutral" variant="outlined">
            Hover me
          </Button>
        </Popup>
      </Stack>

      <Stack gap={1}>
        <Text as="p" variant="bodyStrong">
          Click trigger (requires controlled `visible`):
        </Text>
        <Popup
          debounceDelay={0}
          hideOnClickOutside
          onClose={onCloseCallBack}
          text={
            <Panel onClose={onCloseCallBack} title="Click trigger">
              Triggered by click. The current API has no `triggerEvent` prop, the click must be handled by the consumer
              with a controlled `visible` state.
            </Panel>
          }
          visible={visible}
        >
          <Button onClick={() => setVisible(prev => !prev)} sentiment="neutral" variant="outlined">
            Click me
          </Button>
        </Popup>
      </Stack>
    </Stack>
  )
}

Trigger.parameters = {
  docs: {
    description: {
      story:
        'The planned API will expose a dedicated `Popup.Trigger` component with a `triggerEvent` prop (`click` | `hover`). The current implementation only triggers on hover/focus out of the box; a click trigger must be wired manually through the controlled `visible` prop.',
    },
  },
}
