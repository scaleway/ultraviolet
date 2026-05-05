import { InfoTable } from '..'

import type { Meta } from '@storybook/react-vite'

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
    a11y: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
    experimental: true,
  },
} satisfies Meta

export { Playground } from './Playground.stories'
export { MultiLine } from './MultiLine.stories'
export { ComplexExample } from './ComplexExample.stories'
