import { ContentCard } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: ContentCard,
  title: 'Plus/Compositions/ContentCard',
  tags: ['deprecated'],
  parameters: {
    docs: {
      description: {
        component:
          'This component is deprecated, please import it from `@ultraviolet/ui/compositions/ContentCard` instead. [Click here to see the full documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/compositions-contentcard--docs).',
      },
    },
  },
} satisfies Meta

export { Playground } from './Playground.stories'
