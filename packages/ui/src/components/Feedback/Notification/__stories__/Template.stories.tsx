import type { StoryFn } from '@storybook/react-vite'
import { VerifyCardProductIcon } from '@ultraviolet/icons/product'
import { notification, NotificationContainer } from '..'
import { Button, Text } from '../../../index'

export const Template: StoryFn<typeof NotificationContainer> = args => (
  <>
    <NotificationContainer {...args} />
    <Button
      onClick={() =>
        notification({
          children: (
            <Text as="span" variant="bodySmall">
              You need to review your password security
            </Text>
          ),
          title: 'Invitation',
          icon: <VerifyCardProductIcon size="medium" variant="primary" />,
          isClosable: true,
        })
      }
    >
      Click
    </Button>
  </>
)
