import type { Decorator, StoryFn } from '@storybook/react-vite'
import { Avatar, Button, Stack, Text } from '../../index'
import { NotificationContainer, notification } from '..'

export const Children: StoryFn<typeof NotificationContainer> = args => (
  <div style={{ height: '150px' }}>
    <NotificationContainer {...args} />
    <Stack gap={2} direction="row">
      <Button
        sentiment="neutral"
        onClick={() =>
          notification(
            ({ closeToast }) => (
              <Stack gap={1}>
                <Text as="div" variant="bodySmall">
                  You were invited to join the organization [Org_A]
                </Text>
                <Stack direction="row" gap={1}>
                  <Button
                    onClick={closeToast}
                    sentiment="neutral"
                    variant="outlined"
                    size="small"
                  >
                    Decline
                  </Button>
                  <Button
                    onClick={closeToast}
                    sentiment="primary"
                    variant="filled"
                    size="small"
                  >
                    Accept
                  </Button>
                </Stack>
              </Stack>
            ),

            'Invitation',
            <Avatar text="AB" variant="text" shape="circle" />,
            false,
          )
        }
      >
        Invitation with decline/accept
      </Button>
      <Button
        sentiment="neutral"
        onClick={() =>
          notification(
            <Text as="p" variant="bodySmall">
              You were invited to join the organization [Org_b]
            </Text>,
            'Invitation 2',
            undefined,
            true,
          )
        }
      >
        Invitation with simple close button
      </Button>
    </Stack>
  </div>
)

Children.parameters = {
  docs: {
    description: {
      story:
        'It is possible hide/show the close button with the prop `isClosable` in the component `notification` (by default, set to `false`). Independently, the prop `children` can also be used to define a custom close button with the prop `closeToast` (as shown in the example with decline/accept).',
    },
  },
}

Children.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
] as Decorator[]
