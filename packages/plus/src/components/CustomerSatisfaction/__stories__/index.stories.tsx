import type { Meta } from '@storybook/react-vite'
import { CustomerSatisfaction } from '..'

export default {
  component: CustomerSatisfaction,
  title: 'Plus/Compositions/CustomerSatisfaction',
  tags: ['deprecated'],
  parameters: {
    docs: {
      description: {
        component:
          'This component is deprecated, please import it from `@ultraviolet/ui/compositions/CustomerSatisfaction` instead. [Click here to see the full documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/compositions-customersatisfaction--docs).',
      },
    },
  },
} satisfies Meta

export { Playground } from './Playground.stories'
