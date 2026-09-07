import type { Meta } from '@storybook/react-vite'
import { UnitInput } from '..'

export default {
  component: UnitInput,
  title: 'UI/Data Entry/UnitInput',
  decorators: [
    StoryComponent => (
      <div style={{ height: 250 }}>
        <StoryComponent />
      </div>
    ),
  ],
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { LabelInformation } from './LabelInformation.stories'
export { DefaultValues } from './DefaultValues.stories'
export { States } from './State.stories'
export { Disabled } from './Disabled.stories'
