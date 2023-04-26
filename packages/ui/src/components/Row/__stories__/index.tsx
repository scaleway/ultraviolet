import type { ComponentMeta } from '@storybook/react'
import { Row } from '..'

export default {
  component: Row,
  parameters: {
    docs: {
      description: {
        component: 'A templated row rendered using grid',
      },
    },
    experimental: true,
  },
  title: 'Components/Layout/Row',
} as ComponentMeta<typeof Row>

export { Playground } from './Playground'
export { Gap } from './Gap'
export { AlignItems } from './AlignItems'
export { Example } from './Example'
