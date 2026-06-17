import type { Meta } from '@storybook/react-vite'
import { InfoTable } from '..'

export default {
  component: InfoTable,
  title: 'Compositions/InfoTable',
  subcomponents: {
    InfoTable,
    'InfoTable.Row': InfoTable.Row,
    'InfoTable.Cell': InfoTable.Cell,
    'InfoTable.CellWithCopyButton': InfoTable.CellWithCopyButton,
  },
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
    experimental: true,
  },
} satisfies Meta

export { Playground } from './Playground.stories'
export { MultiLine } from './MultiLine.stories'
export { Size } from './Size.stories'
export { Header } from './Header.stories'
export { ComplexExample } from './ComplexExample.stories'
