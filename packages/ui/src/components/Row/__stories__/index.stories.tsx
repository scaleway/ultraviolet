import type { Meta } from '@storybook/react-vite'
import { Row } from '..'
import a11yDoc from '../a11y.md?raw'

export default {
  component: Row,
  title: 'UI/Layout/Row',
  parameters: {
    a11y: 'compliant',
    a11yContent: a11yDoc,
    audit: {
      'keyboard-focus': true,
      'contrast-visuals': true,
      'semantics-screen-reader': true,
      'pointer-touch': true,
      'specific-patterns': true,
    },
  },
} satisfies Meta<typeof Row>

export { Playground } from './Playground.stories'
export { Gap } from './Gap.stories'
export { AlignItems } from './AlignItems.stories'
export { Padding } from './Padding.stories'
export { Responsive } from './Responsive.stories'
export { Example } from './Example.stories'
