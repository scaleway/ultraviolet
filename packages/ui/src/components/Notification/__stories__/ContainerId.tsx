import type { StoryFn } from '@storybook/react-vite'
import { VerifyCardProductIcon } from '@ultraviolet/icons/product/VerifyCardProductIcon'
import { Button, Stack, Text } from '../../index'
import { NotificationContainer, notification } from '..'

export const ContainerId: StoryFn<typeof NotificationContainer> = args => (
  <Stack gap={2}>
    <NotificationContainer {...args} containerId="notification1" />
    <Button
      onClick={() =>
        notification(
          <Text as="span" variant="bodySmall">
            Default position (top-right)
          </Text>,
          'Notification 1',
          <VerifyCardProductIcon size="medium" variant="primary" />,
          true,
          'notification1',
        )
      }
    >
      ContainerId: &quot; notification1 &quot;
    </Button>
    <NotificationContainer
      {...args}
      containerId="notification2"
      position="bottom-left"
    />
    <Button
      onClick={() =>
        notification(
          <Text as="span" variant="bodySmall">
            Notification at the bottom-left
          </Text>,
          'Notification 2',
          <VerifyCardProductIcon size="medium" variant="primary" />,
          true,
          'notification2',
        )
      }
    >
      ContainerId: &quot; notification2 &quot;
    </Button>
  </Stack>
)

ContainerId.parameters = {
  docs: {
    description: {
      story:
        'It is possible to use multiple containers and assign each notification to a specific container using prop `containerId`',
    },
  },
}
