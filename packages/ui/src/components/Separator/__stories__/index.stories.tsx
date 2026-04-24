import { Separator } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Separator,
  title: 'UI/Layout/Separator',
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
export { Thickness } from './Thickness.stories'
export { Direction } from './Direction.stories'
export { Sentiment } from './Sentiment.stories'
export { Icon } from './Icon.stories'
