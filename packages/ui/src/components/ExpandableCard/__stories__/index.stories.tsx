import type { Meta } from '@storybook/react-vite'
import { ExpandableCard } from '..'

export default {
  component: ExpandableCard,
  subcomponents: {
    'ExpandableCard.Title': ExpandableCard.Title,
  },
  title: 'Components/Layout/ExpandableCard',
} as Meta

export { Controlled } from './Controlled.stories'
export { Disabled } from './Disabled.stories'
export { Draggable } from './Draggable.stories'
export { Header } from './Header.stories'
export { Name } from './Name.stories'
export { Playground } from './Playground.stories'
export { Size } from './Size.stories'
