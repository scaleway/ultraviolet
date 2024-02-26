import type { StoryFn } from '@storybook/react'
import { ProductIcon } from '@ultraviolet/icons'
import { NotificationContainer, notification } from '..'
import { Button, Text } from '../../index'

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
          <ProductIcon name="verifyCard" size="medium" variant="primary" />,
          true,
        )
      }
    >
      Click
    </Button>
  </>
)
