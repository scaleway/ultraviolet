import type { Meta } from '@storybook/react-vite'
import { ExpandableCard } from '..'

export default {
  component: ExpandableCard,
  title: 'UI/Layout/ExpandableCard',
  subcomponents: {
    'ExpandableCard.Title': ExpandableCard.Title,
  },
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
export { Size } from './Size.stories'
export { Header } from './Header.stories'
export { Disabled } from './Disabled.stories'
export { Open } from './Open.stories'
export { Controlled } from './Controlled.stories'
export { Name } from './Name.stories'
export { Draggable } from './Draggable.stories'
