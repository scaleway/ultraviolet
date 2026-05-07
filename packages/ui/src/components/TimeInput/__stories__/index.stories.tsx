import { TimeInput } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: TimeInput,
  title: 'UI/Data Entry/TimeInput',
  decorators: [Story => <Story />],
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
} as Meta<typeof TimeInput>

export { Playground } from './Playground.stories'
export { Size } from './Size.stories'
export { Disabled } from './Disabled.stories'
export { ReadOnly } from './ReadOnly.stories'
export { Placeholder } from './Placeholder.stories'
export { Error } from './Error.stories'
export { Required } from './Required.stories'
export { TimeFormat } from './TimeFormat.stories'
export { Controlled } from './Controlled.stories'
