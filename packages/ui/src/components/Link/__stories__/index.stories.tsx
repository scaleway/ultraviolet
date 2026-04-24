import { Link } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Link,
  title: 'UI/Action/Link',
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
export { Variants } from './Variants.stories'
export { Primary } from './Primary.stories'
export { Target } from './Target.stories'
export { Size } from './Size.stories'
export { OneLine } from './OneLine.stories'
export { Prominence } from './Prominence.stories'
export { Examples } from './Examples.stories'
export { Render } from './Render.stories'
