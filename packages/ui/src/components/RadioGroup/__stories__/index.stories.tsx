import type { Meta } from '@storybook/react-vite'
import { RadioGroup } from '..'

export default {
  component: RadioGroup,
  title: 'UI/Data Entry/RadioGroup',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta<typeof RadioGroup>

export { Playground } from './Playground.stories'
export { Controlled } from './Controlled.stories'
export { Direction } from './Direction.stories'
export { Description } from './Description.stories'
export { Helper } from './Helper.stories'
export { Error } from './Error.stories'
export { Size } from './Size.stories'
