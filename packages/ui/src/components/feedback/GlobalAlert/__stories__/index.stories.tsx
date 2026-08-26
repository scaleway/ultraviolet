import type { Meta } from '@storybook/react-vite'
import { GlobalAlert } from '..'

export default {
  component: GlobalAlert,
  title: 'UI/Feedback/GlobalAlert',
  subcomponents: { 'GlobalAlert.Link': GlobalAlert.Link },
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
export { Closable } from './Closable.stories'
export { Button } from './Button.stories'
export { Link } from './Link.stories'
