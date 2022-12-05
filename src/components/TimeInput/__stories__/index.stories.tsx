import { ComponentMeta } from '@storybook/react'
import TimeInput from '..'

export default {
  component: TimeInput,
  parameters: {
    docs: {
      description: {
        component: 'A simple input to choose a time in a list.',
      },
    },
  },
  title: 'Components/Data Entry/TimeInput',
} as ComponentMeta<typeof TimeInput>

export { Playground } from './Playground.stories'
export { Controlled } from './Controlled.stories'
export { Placeholder } from './Placeholder.stories'
export { Disabled } from './Disabled.stories'
export { Required } from './Required.stories'
export { Error } from './Error.stories'
export { Schedule } from './Schedule.stories'
