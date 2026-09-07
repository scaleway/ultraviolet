import type { Meta } from '@storybook/react-vite'
import { NotificationContainer } from '..'

export default {
  component: NotificationContainer,
  title: 'UI/Feedback/Notification',
  parameters: {
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
  },
} as Meta<typeof NotificationContainer>

export { Playground } from './Playground.stories'
export { Children } from './Children'
export { ContainerId } from './ContainerId'
