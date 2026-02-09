import type { Meta } from '@storybook/react-vite'
import { InfoTable } from '..'

export default {
  component: InfoTable,
  title: 'Plus/Compositions/InfoTable',
  subcomponents: {
    InfoTable,
    'InfoTable.Row': InfoTable.Row,
    'InfoTable.Cell': InfoTable.Cell,
  },
  tags: ['deprecated'],
  parameters: {
    docs: {
      description: {
        component:
          'This component is deprecated, please import it from `@ultraviolet/ui/compositions/InfoTable` instead. [Click here to see the full documentation](https://storybook.ultraviolet.scaleway.com/?path=/docs/compositions-infotable--docs).',
      },
    },
  },
} satisfies Meta

export { Playground } from './Playground.stories'
