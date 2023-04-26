import type { ComponentMeta } from '@storybook/react'
import { TimeInput } from '..'

export default {
  component: TimeInput,
  parameters: {
    docs: {
      description: {
        component: 'A simple input to choose a time in a list.',
      },
    },
    experimental: true,
  },
  title: 'Components/Data Entry/TimeInput',
  decorators: [
    Story => (
      <div style={{ height: 300 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TimeInput>

export { Playground } from './Playground'
export { Controlled } from './Controlled'
export { Placeholder } from './Placeholder'
export { Disabled } from './Disabled'
export { Required } from './Required'
export { Error } from './Error'
export { Schedule } from './Schedule'
