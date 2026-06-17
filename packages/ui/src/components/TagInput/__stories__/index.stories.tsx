import type { Meta } from '@storybook/react-vite'
import { TagInput } from '..'

export default {
  component: TagInput,
  title: 'UI/Data Entry/TagInput',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
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
