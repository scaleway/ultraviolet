import type { Meta } from '@storybook/react-vite'
import { Separator } from '..'

export default {
  component: Separator,
  title: 'UI/Layout/Separator',
  parameters: {
    a11yStatus: 'partial',
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
