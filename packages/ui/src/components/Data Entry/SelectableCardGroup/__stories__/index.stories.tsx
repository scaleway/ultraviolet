import type { Meta } from '@storybook/react-vite'
import { SelectableCardGroup } from '..'

export default {
  component: SelectableCardGroup,
  title: 'UI/Data Entry/SelectableCardGroup',
  parameters: {
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
  },
} as Meta<typeof SelectableCardGroup>

export { Playground } from './Playground.stories'
export { Columns } from './Columns.stories'
export { Checkbox } from './Checkbox'
export { Error } from './Error.stories'
export { Examples } from './Examples.stories'
