import type { Meta } from '@storybook/react-vite'
import { Expandable } from '..'

export default {
  component: Expandable,
  title: 'UI/Action/Expandable',
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
export { Controlled } from './Controlled.stories'
export { MinHeight } from './MinHeight.stories'
export { NestedExpandable } from './NestedExpandable.stories'
export { NoAnimations } from './NoAnimations.stories'
