import type { Meta } from '@storybook/react-vite'
import { KeyValueInput } from '..'

export default {
  component: KeyValueInput,
  title: 'UI/Data Entry/KeyValueInput',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta<typeof KeyValueInput>

export { Playground } from './Playground.stories'
export { Size } from './Size.stories'
export { ReadOnly } from './ReadOnly.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
export { MaxSize } from './MaxSize.stories'
export { WithSelectInput } from './WithSelectInput.stories'
