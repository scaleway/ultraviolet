import type { Meta } from '@storybook/react'
import { UnitInput } from '..'

export default {
  component: UnitInput,
  title: 'Components/Data Entry/UnitInput',
  decorators: [
    StoryComponent => (
      <div style={{ height: 400 }}>
        <StoryComponent />
      </div>
    ),
  ],
} as Meta

export { Playground } from './Playground.stories'
export { LabelInformation } from './LabelInformation.stories'
export { DefaultValues } from './DefaultValues.stories'
export { States } from './State.stories'
export { Disabled } from './Disabled.stories'
