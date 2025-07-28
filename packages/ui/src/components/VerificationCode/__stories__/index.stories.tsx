import type { Meta } from '@storybook/react-vite'
import { VerificationCode } from '..'

export default {
  component: VerificationCode,
  title: 'Components/Data Entry/VerificationCode',
} as Meta<typeof VerificationCode>

export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
export { Fields } from './Fields.stories'
export { Helper } from './Helper.stories'
export { InitialValue } from './InitialValue.stories'
export { LabelDescription } from './LabelDescription.stories'
export { OnComplete } from './OnComplete.stories'
export { Placeholder } from './Placeholder.stories'
export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
export { Size } from './Size.stories'
export { Success } from './Success.stories'
export { Type } from './Type.stories'
