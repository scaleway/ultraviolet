import { NotificationContainer } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: NotificationContainer,
  title: 'UI/Feedback/Notification',
  parameters: {
    a11y: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
} as Meta<typeof NotificationContainer>

export { Playground } from './Playground.stories'
export { Children } from './Children'
export { ContainerId } from './ContainerId'
