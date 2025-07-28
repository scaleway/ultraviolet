import type { Meta } from '@storybook/react-vite'
import { TextInput } from '..'

export default {
  component: TextInput,
  title: 'Components/Data Entry/TextInput',
} as Meta<typeof TextInput>

export { Clearable } from './Clearable.stories'
export { ControlledVSUncontrolled } from './ControlledVSUncontrolled.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
export { Examples } from './Examples.stories'
export { Loading } from './Loading.stories'
export { OnRandomize } from './OnRandomize.stories'
export { Password } from './Password.stories'
export { Playground } from './Playground.stories'
export { ReadOnly } from './ReadOnly.stories'
export { Size } from './Size.stories'
export { Success } from './Success.stories'
