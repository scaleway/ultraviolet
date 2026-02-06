import type { Meta } from '@storybook/react-vite'
import { EstimateCost } from '..'

export default {
  component: EstimateCost,
  subcomponents: {
    Item: EstimateCost.Item,
    LineThrough: EstimateCost.LineThrough,
    Region: EstimateCost.Region,
    Regular: EstimateCost.Regular,
    NumberInput: EstimateCost.NumberInput,
    Strong: EstimateCost.Strong,
    Unit: EstimateCost.Unit,
  },
  title: 'Plus/Compositions/EstimateCost',
  tags: ['deprecated'],
  parameters: {
    docs: {
      description: {
        component:
          'This component is deprecated, please import it from `@ultraviolet/ui/compositions/EstimateCost` instead. [Click here to see the full documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/compositions-estimatecost--docs).',
      },
    },
  },
} satisfies Meta

export { Playground } from './Playground.stories'
