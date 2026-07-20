import type { Meta } from '@storybook/react-vite'
import { Text } from '..'

export default {
  component: Text,
  title: 'UI/Typography/Text',
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
export { Variants } from './Variants.stories'
export { Sentiments } from './Sentiments.stories'
export { As } from './As.stories'
export { Prominence } from './Prominence.stories'
export { Disabled } from './Disabled.stories'
export { Italic } from './Italic.stories'
export { Underline } from './Underline.stories'
export { OneLine } from './OneLine.stories'
export { Dir } from './Dir.stories'
export { Placement } from './Placement.stories'
export { Showcase } from './Showcase.stories'
