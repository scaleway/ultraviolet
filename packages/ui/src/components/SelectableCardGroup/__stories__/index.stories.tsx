import { SelectableCardGroup } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: SelectableCardGroup,
  title: 'UI/Data Entry/SelectableCardGroup',
  parameters: {
    a11y: 'partial',
  },
} as Meta<typeof SelectableCardGroup>

export { Playground } from './Playground.stories'
export { Columns } from './Columns.stories'
export { Checkbox } from './Checkbox'
export { Error } from './Error.stories'
export { Examples } from './Examples.stories'
