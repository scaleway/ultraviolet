import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../../../Action/Button'
import { Stack } from '../../../../Layout/Stack'
import { Text } from '../../../../Typography/Text'
import { Popup } from '../index'

const Content = () => (
  <Stack gap={1}>
    <Text as="p" variant="bodySmall">
      Popup content
    </Text>
  </Stack>
)

export const Triggers: StoryFn<typeof Popup> = () => (
  <Stack gap={2} direction="row" alignItems="flex-end">
    <Popup.Root>
      <Popup.Trigger triggerEvent="click">
        <Button sentiment="neutral" variant="outlined">
          Click to open
        </Button>
      </Popup.Trigger>
      <Popup.Panel>
        <Content />
      </Popup.Panel>
    </Popup.Root>

    <Popup.Root>
      <Popup.Trigger triggerEvent="hover">
        <Button sentiment="neutral" variant="outlined">
          Hover to open
        </Button>
      </Popup.Trigger>
      <Popup.Panel>
        <Content />
      </Popup.Panel>
    </Popup.Root>
  </Stack>
)
