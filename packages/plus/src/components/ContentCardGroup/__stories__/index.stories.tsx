import type { Meta } from '@storybook/react-vite'
import { ContentCardGroup } from '..'

export default {
  component: ContentCardGroup,
  title: 'Plus/Compositions/ContentCardGroup',
  subcomponents: { 'ContentCardGroup.Card': ContentCardGroup.Card },
  tags: ['deprecated'],
  parameters: {
    docs: {
      description: {
        component:
          'This component is deprecated, please import it from `@ultraviolet/ui/compositions/ContentCardGroup` instead. [Click here to see the full documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/compositions-contentcardgroup--docs).',
      },
    },
  },
} satisfies Meta

export { Playground } from './Playground.stories'
