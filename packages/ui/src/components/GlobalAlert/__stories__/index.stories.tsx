import { GlobalAlert } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: GlobalAlert,
  title: 'UI/Feedback/GlobalAlert',
  subcomponents: { 'GlobalAlert.Link': GlobalAlert.Link },
} as Meta

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
export { Closable } from './Closable.stories'
export { Button } from './Button.stories'
export { Link } from './Link.stories'
