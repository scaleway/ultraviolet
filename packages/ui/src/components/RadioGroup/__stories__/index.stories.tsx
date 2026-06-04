import type { Meta } from '@storybook/react-vite'
import { RadioGroup } from '..'

export default {
  component: RadioGroup,
  title: 'UI/Data Entry/RadioGroup',
  parameters: {
    a11yStatus: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
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
