import type { StoryFn } from '@storybook/react-vite'
import { useCallback, useState } from 'react'
import { Button } from '../../../Action/Button'
import { Stack } from '../../../Layout/Stack'
import { Text } from '../../../Typography/Text'
import { Popup } from '../index'
import { Panel } from './Panel'

export const Playground: StoryFn<typeof Popup> = args => {
  const [visible, setVisible] = useState(false)

  const onCloseCallBack = useCallback(() => {
    setVisible(false)
  }, [])

  return (
    <Popup
      {...args}
      debounceDelay={0}
      hideOnClickOutside
      onClose={onCloseCallBack}
      text={
        <Panel onClose={onCloseCallBack} title="Popup Title">
          <Text as="p" variant="bodySmall">
            This is a simple panel content displayed inside the popup, mimicking the Popover. Passing rich content to
            the current API means building it yourself with components (here a custom `Panel`).
          </Text>
        </Panel>
      }
      visible={visible}
    >
      <Button onClick={() => setVisible(prev => !prev)} sentiment="neutral" variant="outlined">
        Open Popup
      </Button>
    </Popup>
  )
}

Playground.parameters = {
  docs: {
    description: {
      story:
        'A baseline playground. The current API exposes a `visible` prop to control the state, and an `onClose` callback fired when the popup is dismissed (outside click, Escape, or the panel close button). Contrary to the planned compound API, the trigger is not a dedicated component: the children are wrapped in a `div` that carries the event handlers, `tabIndex` and ARIA attributes.',
    },
  },
}

Playground.decorators = [
  StoryComponent => (
    <Stack alignItems="center" width="100%">
      <StoryComponent />
    </Stack>
  ),
]
