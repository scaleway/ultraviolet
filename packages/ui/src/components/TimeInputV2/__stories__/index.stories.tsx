import type { Meta } from '@storybook/react'
import { TimeInputV2 } from '..'

export default {
  component: TimeInputV2,
  parameters: {
    experimental: true,
  },
  tags: ['experimental'],
  title: 'Components/Data Entry/TimeInputV2',
  decorators: [Story => <Story />],
} as Meta<typeof TimeInputV2>

export { Playground } from './Playground.stories'
export { Size } from './Size.stories'
export { Disabled } from './Disabled.stories'
export { ReadOnly } from './ReadOnly.stories'
export { Placeholder } from './Placeholder.stories'
export { Error } from './Error.stories'
export { Required } from './Required.stories'
export { TimeFormat } from './TimeFormat.stories'
export { Controlled } from './Controlled.stories'
