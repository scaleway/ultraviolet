import type { Meta } from '@storybook/react-vite'
import { Row } from '..'

export default {
  component: Row,
  title: 'UI/Layout/Row',
  parameters: {
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
  },
} as Meta<typeof Row>

export { Playground } from './Playground.stories'
export { Gap } from './Gap.stories'
export { AlignItems } from './AlignItems.stories'
export { Padding } from './Padding.stories'
export { Responsive } from './Responsive.stories'
export { Example } from './Example.stories'
