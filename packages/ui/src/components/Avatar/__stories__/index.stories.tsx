import { Avatar } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Avatar,
  title: 'UI/Other/Avatar',
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
export { Shape } from './Shape.stories'
export { Variant } from './Variant.stories'
export { Sentiment } from './Sentiment.stories'
export { Size } from './Size.stories'
export { Upload } from './Upload.stories'
export { Examples } from './Examples.stories'
