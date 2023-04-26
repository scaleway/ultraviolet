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

export { Playground } from './Playground'
export { Fields } from './Fields'
export { InitialValue } from './InitialValue'
export { Placeholder } from './Placeholder'
export { Error } from './Error'
export { Type } from './Type'
export { OnComplete } from './OnComplete'
