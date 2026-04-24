import { TagInput } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: TagInput,
  title: 'UI/Data Entry/TagInput',
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
} as Meta

export { Playground } from './Playground.stories'
export { Size } from './Size.stories'
export { Placeholder } from './Placeholder.stories'
export { Helper } from './Helper.stories'
export { Disabled } from './Disabled.stories'
export { ReadOnly } from './ReadOnly.stories'
export { Success } from './Success.stories'
export { Error } from './Error.stories'
export { LabelDescription } from './LabelDescription.stories'
export { Tooltip } from './Tooltip.stories'
