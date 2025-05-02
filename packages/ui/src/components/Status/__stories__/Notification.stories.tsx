import type { StoryFn } from '@storybook/react'
import { NotificationIcon } from '@ultraviolet/icons'
import { Status } from '..'
import { Button } from '../../Button'

export const Notification: StoryFn<typeof Status> = props => (
  <Button variant="ghost" sentiment="neutral" size="medium">
    <NotificationIcon />
    <Status {...props} sentiment="danger" notification />
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
