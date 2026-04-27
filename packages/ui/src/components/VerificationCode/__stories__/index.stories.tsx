import { VerificationCode } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: VerificationCode,
  title: 'UI/Data Entry/VerificationCode',
  parameters: {
    a11y: 'partial',
  },
} as Meta<typeof VerificationCode>

export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
export { LabelDescription } from './LabelDescription.stories'
export { Size } from './Size.stories'
export { Disabled } from './Disabled.stories'
export { Fields } from './Fields.stories'
export { InitialValue } from './InitialValue.stories'
export { Placeholder } from './Placeholder.stories'
export { Helper } from './Helper.stories'
export { Error } from './Error.stories'
export { Success } from './Success.stories'
export { Type } from './Type.stories'
export { OnComplete } from './OnComplete.stories'
