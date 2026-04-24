import { Radio } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Radio,
  title: 'UI/Data Entry/Radio',
  parameters: {
    a11y: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
} as Meta<typeof Radio>

export { Playground } from './Playground.stories'
export { Controlled } from './Controlled.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
export { Helper } from './Helper.stories'
