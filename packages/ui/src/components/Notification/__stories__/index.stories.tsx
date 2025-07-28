import type { Meta } from '@storybook/react-vite'
import { NotificationContainer } from '..'

export default {
  component: NotificationContainer,
  title: 'Components/Feedback/Notification',
} as Meta<typeof NotificationContainer>

export { Playground } from './Playground.stories'
export { Children } from './Children'
export { ContainerId } from './ContainerId'
