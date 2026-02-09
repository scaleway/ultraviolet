import type { Meta } from '@storybook/react-vite'
import { FAQ } from '..'

export default {
  component: FAQ,
  title: 'Plus/Compositions/FAQ',
  tags: ['deprecated'],
  parameters: {
    docs: {
      description: {
        component:
          'This component is deprecated, please import it from `@ultraviolet/ui/compositions/FAQ` instead. [Click here to see the full documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/compositions-faq--docs).',
      },
    },
  },
} satisfies Meta

export { Playground } from './Playground.stories'
