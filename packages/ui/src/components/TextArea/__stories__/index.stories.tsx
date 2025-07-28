import type { Meta } from '@storybook/react-vite'
import { TextArea } from '..'

export default {
  component: TextArea,
  title: 'Components/Data Entry/TextArea',
} as Meta<typeof TextArea>

export { AutomaticRows } from './AutomaticRows.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
export { Examples } from './Examples.stories'
export { Helper } from './Helper.stories'
export { MaxLength } from './MaxLength.stories'
export { Placeholder } from './Placeholder.stories'
export { Playground } from './Playground.stories'
export { ReadOnly } from './ReadOnly.stories'
export { Success } from './Success.stories'
