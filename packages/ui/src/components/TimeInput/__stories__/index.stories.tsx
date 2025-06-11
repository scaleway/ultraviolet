import type { Meta } from '@storybook/react'
import { TimeInput } from '..'

export default {
  component: TimeInput,
  title: 'Components/Data Entry/TimeInput',
  decorators: [Story => <Story />],
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
