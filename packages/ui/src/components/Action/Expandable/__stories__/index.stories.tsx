import type { Meta } from '@storybook/react-vite'
import { Expandable } from '..'

export default {
  component: Expandable,
  title: 'UI/Action/Expandable',
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
export { Controlled } from './Controlled.stories'
export { MinHeight } from './MinHeight.stories'
export { NestedExpandable } from './NestedExpandable.stories'
export { NoAnimations } from './NoAnimations.stories'
