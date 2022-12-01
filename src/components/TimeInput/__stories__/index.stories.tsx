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
// export { Sizes } from './Sizes.stories'
export { Disabled } from './Disabled.stories'
export { Required } from './Required.stories'
// export { Valid } from './Valid.stories'
// export { ReadOnly } from './ReadOnly.stories'
export { Error } from './Error.stories'
export { Schedule } from './Schedule.stories'
// export { ToggleablePassword } from './ToggleablePassword.stories'
// export { Unit } from './Unit.stories'
// export { Randomize } from './Randomize.stories'
// export { ForceEdit } from './ForceEdit.stories'
// export { Multiline } from './Multiline.stories'
// export { DisableResize } from './DisableResize.stories'
// export { TabIndex } from './TabIndex.stories'
