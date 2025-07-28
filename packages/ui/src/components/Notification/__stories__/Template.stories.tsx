import type { StoryFn } from '@storybook/react-vite'
import { VerifyCardProductIcon } from '@ultraviolet/icons/product'
import { Button, Text } from '../../index'
import { NotificationContainer, notification } from '..'

export const Template: StoryFn<typeof NotificationContainer> = args => (
  <>
    <NotificationContainer {...args} />
    <Button
      onClick={() =>
        notification(
          <Text as="span" variant="bodySmall">
            You need to review your password security
          </Text>,
          'Invitation',
          <VerifyCardProductIcon size="medium" variant="primary" />,
          true,
        )
      }
    >
      Click
    </Button>
  </>
)
