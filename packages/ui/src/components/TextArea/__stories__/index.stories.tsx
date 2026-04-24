import { TextArea } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: TextArea,
  title: 'UI/Data Entry/TextArea',
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
} as Meta<typeof TextArea>

export { Playground } from './Playground.stories'
export { Placeholder } from './Placeholder.stories'
export { Disabled } from './Disabled.stories'
export { Success } from './Success.stories'
export { Error } from './Error.stories'
export { Helper } from './Helper.stories'
export { ReadOnly } from './ReadOnly.stories'
export { MaxLength } from './MaxLength.stories'
export { AutomaticRows } from './AutomaticRows.stories'
export { Examples } from './Examples.stories'
