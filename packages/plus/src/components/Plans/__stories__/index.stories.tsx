import type { Meta } from '@storybook/react-vite'
import { Plans } from '..'

export default {
  component: Plans,
  title: 'Plus/Compositions/Plans',
  tags: ['deprecated'],
  parameters: {
    docs: {
      description: {
        component:
          'This component is deprecated, please import it from `@ultraviolet/ui/compositions/Plans` instead. [Click here to see the full documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/compositions-plans--docs).',
      },
    },
  },
} as Meta<typeof Plans>

export { Playground } from './Playground.stories'
