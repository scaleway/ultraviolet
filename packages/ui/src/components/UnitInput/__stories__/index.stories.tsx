import type { Meta } from '@storybook/react-vite'
import { UnitInput } from '..'

export default {
  component: UnitInput,
  decorators: [
    StoryComponent => (
      <div style={{ height: 250 }}>
        <StoryComponent />
      </div>
    ),
  ],
  title: 'Components/Data Entry/UnitInput',
} as Meta

export { DefaultValues } from './DefaultValues.stories'
export { Disabled } from './Disabled.stories'
export { LabelInformation } from './LabelInformation.stories'
export { Playground } from './Playground.stories'
export { States } from './State.stories'
