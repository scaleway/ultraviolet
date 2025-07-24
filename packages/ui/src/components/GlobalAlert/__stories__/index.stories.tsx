import type { Meta } from '@storybook/react-vite'
import { GlobalAlert } from '..'

export default {
  component: GlobalAlert,
  title: 'Components/Feedback/GlobalAlert',
  subcomponents: { 'GlobalAlert.Link': GlobalAlert.Link },
} as Meta

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
export { Closable } from './Closable.stories'
export { Button } from './Button.stories'
export { Link } from './Link.stories'
