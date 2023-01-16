import type { ComponentMeta } from '@storybook/react'
import { VerificationCode } from '..'

export default {
  component: VerificationCode,
  title: 'Components/Data Entry/VerificationCode',
  parameters: {
    docs: {
      description: {
        component: 'A component to enter some text or numbers one by one.',
      },
    },
  },
} as ComponentMeta<typeof VerificationCode>

export { Playground } from './Playground.stories'
export { Fields } from './Fields.stories'
export { InitialValue } from './InitialValue.stories'
export { Placeholder } from './Placeholder.stories'
export { Error } from './Error.stories'
export { Type } from './Type.stories'
export { OnComplete } from './OnComplete.stories'
