import type { Meta } from '@storybook/react'
import { VerificationCode } from '..'

export default {
  component: VerificationCode,
  title: 'Components/Data Entry/VerificationCode',
} as Meta<typeof VerificationCode>

export { Playground } from './Playground.stories'
export { Fields } from './Fields.stories'
export { InitialValue } from './InitialValue.stories'
export { Placeholder } from './Placeholder.stories'
export { Error } from './Error.stories'
export { Type } from './Type.stories'
export { OnComplete } from './OnComplete.stories'
