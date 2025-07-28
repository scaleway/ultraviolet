import type { Meta } from '@storybook/react-vite'
import { TimeInput } from '..'

export default {
  component: TimeInput,
  title: 'Components/Data Entry/TimeInput',
  decorators: [Story => <Story />],
} as Meta<typeof TimeInput>

export { Controlled } from './Controlled.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
export { Placeholder } from './Placeholder.stories'
export { Playground } from './Playground.stories'
export { ReadOnly } from './ReadOnly.stories'
export { Required } from './Required.stories'
export { Size } from './Size.stories'
export { TimeFormat } from './TimeFormat.stories'
