import { NotificationIcon } from '@ultraviolet/icons/NotificationIcon'

import { Status } from '..'
import { Button } from '../../Button'

import type { StoryFn } from '@storybook/react-vite'

export const Notification: StoryFn<typeof Status> = props => (
  <Button sentiment="neutral" size="medium" variant="ghost">
    <NotificationIcon />
    <Status {...props} notification sentiment="danger" />
  </Button>
)

Notification.parameters = {
  docs: {
    description: {
      story:
        'Set `notification` to enable the status in notification mode. This mode will make the status absolute to the parent and on top right. For it to work properly you need to wrap it into a `display: relative;` parent.',
    },
  },
}

Notification.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', gap: 16 }}>
      <StoryComponent />
    </div>
  ),
]
