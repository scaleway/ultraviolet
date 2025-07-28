import type { Meta } from '@storybook/react-vite'
import { GlobalAlert } from '..'

export default {
  component: GlobalAlert,
  subcomponents: { 'GlobalAlert.Link': GlobalAlert.Link },
  title: 'Components/Feedback/GlobalAlert',
} as Meta

export { Button } from './Button.stories'
export { Closable } from './Closable.stories'
export { Link } from './Link.stories'
export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
