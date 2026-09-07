import type { Meta } from '@storybook/react-vite'
import { SelectableCardGroup } from '..'

export default {
  component: SelectableCardGroup,
  title: 'UI/Data Entry/SelectableCardGroup',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta<typeof SelectableCardGroup>

export { Playground } from './Playground.stories'
export { Columns } from './Columns.stories'
export { Checkbox } from './Checkbox'
export { Error } from './Error.stories'
export { Examples } from './Examples.stories'
