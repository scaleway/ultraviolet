import { Row } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Row,
  title: 'UI/Layout/Row',
  parameters: {
    a11y: 'compliant',
    audit: {
      'keyboard-focus': true,
      'contrast-visuals': true,
      'semantics-screen-reader': true,
      'pointer-touch': true,
      'specific-patterns': true,
    },
  },
} as Meta<typeof Row>

export { Playground } from './Playground.stories'
export { Gap } from './Gap.stories'
export { AlignItems } from './AlignItems.stories'
export { Padding } from './Padding.stories'
export { Responsive } from './Responsive.stories'
export { Example } from './Example.stories'
