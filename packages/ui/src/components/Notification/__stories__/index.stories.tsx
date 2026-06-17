import type { Meta } from '@storybook/react-vite'
import { NotificationContainer } from '..'

export default {
  component: NotificationContainer,
  title: 'UI/Feedback/Notification',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta<typeof NotificationContainer>

export { Playground } from './Playground.stories'
export { Children } from './Children'
export { ContainerId } from './ContainerId'
