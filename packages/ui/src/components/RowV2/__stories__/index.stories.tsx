import type { ComponentMeta } from '@storybook/react'
import { RowV2 } from '..'

export default {
  component: RowV2,
  parameters: {
    docs: {
      description: {
        component: 'A templated row rendered using grid',
      },
    },
    experimental: true,
  },
  title: 'Components/Layout/RowV2',
} as ComponentMeta<typeof RowV2>

export { Playground } from './Playground.stories'
export { Gap } from './Gap.stories'
export { AlignItems } from './AlignItems.stories'
export { Example } from './Example.stories'
