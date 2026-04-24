import { Expandable } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Expandable,
  title: 'UI/Action/Expandable',
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
} as Meta

export { Playground } from './Playground.stories'
export { Controlled } from './Controlled.stories'
export { MinHeight } from './MinHeight.stories'
export { NestedExpandable } from './NestedExpandable.stories'
export { NoAnimations } from './NoAnimations.stories'
