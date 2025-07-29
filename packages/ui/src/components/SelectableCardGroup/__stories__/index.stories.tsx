import type { Meta } from '@storybook/react-vite'
import { SelectableCardGroup } from '..'

export default {
  component: SelectableCardGroup,
  title: 'Components/Data Entry/SelectableCardGroup',
} as Meta<typeof SelectableCardGroup>

export { Playground } from './Playground.stories'
export { Columns } from './Columns.stories'
export { Checkbox } from './Checkbox'
export { Error } from './Error.stories'
export { Examples } from './Examples.stories'
