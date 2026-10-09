import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../../../Action/Button'
import { Stack } from '../../../../Layout/Stack'
import { Text } from '../../../../Typography/Text'
import { PopupV2 } from '../index'

const Content = () => (
  <Stack gap={1}>
    <Text as="p" variant="bodySmall">
      Popup content
    </Text>
  </Stack>
)

export const Triggers: StoryFn<typeof PopupV2> = () => (
  <Stack gap={2} direction="row" alignItems="flex-end">
    <PopupV2.Root>
      <PopupV2.Trigger triggerEvent="click">
        <Button sentiment="neutral" variant="outlined">
          Click to open
        </Button>
      </PopupV2.Trigger>
      <PopupV2.Panel>
        <Content />
      </PopupV2.Panel>
    </PopupV2.Root>

    <PopupV2.Root>
      <PopupV2.Trigger triggerEvent="hover">
        <Button sentiment="neutral" variant="outlined">
          Hover to open
        </Button>
      </PopupV2.Trigger>
      <PopupV2.Panel>
        <Content />
      </PopupV2.Panel>
    </PopupV2.Root>
  </Stack>
)
