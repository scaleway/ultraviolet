import type { Meta } from '@storybook/react-vite'
import { Status } from '..'

export default {
  component: Status,
  title: 'UI/Feedback/Status',
  parameters: {
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Tooltip } from './Tooltip.stories'
export { Animated } from './Animated.stories'
export { Notification } from './Notification.stories'
