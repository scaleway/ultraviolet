import type { Meta } from '@storybook/react-vite'
import { OfferList } from '..'

export default {
  component: OfferList,
  title: 'Plus/Compositions/OfferList',
  subcomponents: {
    OfferList,
    'OfferList.Row': OfferList.Row,
    'OfferList.Cell': OfferList.Cell,
  },
  tags: ['deprecated'],
  parameters: {
    docs: {
      description: {
        component:
          'This component is deprecated, please import it from `@ultraviolet/ui/compositions/OfferList` instead. [Click here to see the full documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/compositions-offerlist--docs).',
      },
    },
  },
} satisfies Meta

export { Playground } from './Playground.stories'
