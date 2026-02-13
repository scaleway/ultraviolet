import type { Meta } from '@storybook/react-vite'
import { OrderSummary } from '..'

export default {
  component: OrderSummary,
  title: 'Plus/Compositions/OrderSummary',
  tags: ['deprecated'],
  parameters: {
    docs: {
      description: {
        component:
          'This component is deprecated, please import it from `@ultraviolet/ui/compositions/OrderSummary` instead. [Click here to see the full documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/compositions-ordersummary--docs).',
      },
    },
  },
} satisfies Meta

export { Playground } from './Playground.stories'
