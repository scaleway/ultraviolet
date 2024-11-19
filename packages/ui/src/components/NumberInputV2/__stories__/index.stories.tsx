import type { Meta } from '@storybook/react'
import { NumberInputV2 } from '..'

export default {
  component: NumberInputV2,
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
  parameters: {
    experimental: true,
  },
  tags: ['experimental'],
  title: 'Components/Data Entry/NumberInputV2',
} as Meta<typeof NumberInputV2>

export { Playground } from './Playground.stories'
export { Sizes } from './Sizes.stories'
export { Placeholder } from './Placeholder.stories'
export { Helper } from './Helper.stories'
export { MinMax } from './MinMax.stories'
export { Step } from './Step.stories'
export { Unit } from './Unit.stories'
export { Disabled } from './Disabled.stories'
export { ReadOnly } from './ReadOnly.stories'
export { Error } from './Error.stories'
export { Success } from './Success.stories'
export { LabelDescription } from './LabelDescription.stories'
export { Controls } from './Controls.stories'
