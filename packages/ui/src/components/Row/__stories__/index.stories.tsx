import type { Meta } from '@storybook/react'
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
} as Meta<typeof Row>

export { Playground } from './Playground.stories'
export { Gap } from './Gap.stories'
export { AlignItems } from './AlignItems.stories'
export { Example } from './Example.stories'
