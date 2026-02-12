import type { Meta } from '@storybook/react-vite'
import { SteppedListCard } from '..'

export default {
  component: SteppedListCard,
  title: 'Plus/Compositions/SteppedListCard',
  tags: ['deprecated'],
  parameters: {
    docs: {
      description: {
        component:
          'This component is deprecated, please import it from `@ultraviolet/ui/compositions/SteppedListCard` instead. [Click here to see the full documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/compositions-steppedlistcard--docs).',
      },
    },
  },
} satisfies Meta

export { Playground } from './Playground.stories'
