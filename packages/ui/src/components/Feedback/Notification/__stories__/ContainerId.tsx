import type { StoryFn } from '@storybook/react-vite'
import { VerifyCardProductIcon } from '@ultraviolet/icons/product/VerifyCardProductIcon'
import { notification, NotificationContainer } from '..'
import { Button, Stack, Text } from '../../../index'

export const ContainerId: StoryFn<typeof NotificationContainer> = args => (
  <Stack gap={2}>
    <NotificationContainer {...args} containerId="notification1" />
    <Button
      onClick={() =>
        notification({
          children: (
            <Text as="span" variant="bodySmall">
              Default position (top-right)
            </Text>
          ),
          title: 'Notification 1',
          icon: <VerifyCardProductIcon size="medium" variant="primary" />,
          isClosable: true,
          containerId: 'notification1',
        })
      }
    >
      ContainerId: &quot; notification1 &quot;
    </Button>
    <NotificationContainer {...args} containerId="notification2" position="bottom-left" />
    <Button
      onClick={() =>
        notification({
          children: (
            <Text as="span" variant="bodySmall">
              Notification at the bottom-left
            </Text>
          ),
          title: 'Notification 2',
          icon: <VerifyCardProductIcon size="medium" variant="primary" />,
          isClosable: true,
          containerId: 'notification2',
        })
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
