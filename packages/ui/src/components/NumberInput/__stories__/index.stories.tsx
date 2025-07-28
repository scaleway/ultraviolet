import type { Meta } from '@storybook/react-vite'
import { NumberInput } from '..'

export default {
  component: NumberInput,
  decorators: [
    StoryComponent => (
      <div
        style={{
          width: '250px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
  title: 'Components/Data Entry/NumberInput',
} as Meta<typeof NumberInput>

export { Controls } from './Controls.stories'
export { Disabled } from './Disabled.stories'
export { Error } from './Error.stories'
export { Helper } from './Helper.stories'
export { LabelDescription } from './LabelDescription.stories'
export { MinMax } from './MinMax.stories'
export { Placeholder } from './Placeholder.stories'
export { Playground } from './Playground.stories'
export { ReadOnly } from './ReadOnly.stories'
export { Sizes } from './Sizes.stories'
export { Step } from './Step.stories'
export { Success } from './Success.stories'
export { Unit } from './Unit.stories'
