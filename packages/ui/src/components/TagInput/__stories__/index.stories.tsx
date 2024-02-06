import type { Meta } from '@storybook/react'
import { TagInput } from '..'

export default {
  component: TagInput,
  parameters: {
    experimental: true,
  },
  title: 'Components/Data Entry/TagInput',
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
