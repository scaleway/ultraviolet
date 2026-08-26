import type { Meta } from '@storybook/react-vite'
import { SelectableCardOptionGroup } from '..'

export default {
  component: SelectableCardOptionGroup,
  title: 'UI/Data Entry/SelectableCardOptionGroup',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta<typeof SelectableCardOptionGroup>

export { Playground } from './Playground.stories'
export { Sizes } from './Sizes.stories'
export { Columns } from './Columns.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
export { Examples } from './Examples.stories'
