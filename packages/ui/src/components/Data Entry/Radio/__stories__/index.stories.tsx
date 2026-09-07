import type { Meta } from '@storybook/react-vite'
import { Radio } from '..'

export default {
  component: Radio,
  title: 'UI/Data Entry/Radio',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta<typeof Radio>

export { Playground } from './Playground.stories'
export { Controlled } from './Controlled.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
export { Helper } from './Helper.stories'
export { Size } from './Size.stories'
