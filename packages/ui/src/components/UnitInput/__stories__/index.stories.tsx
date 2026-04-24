import { UnitInput } from '..'

import type { Meta } from '@storybook/react-vite'

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
    a11y: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { LabelInformation } from './LabelInformation.stories'
export { DefaultValues } from './DefaultValues.stories'
export { States } from './State.stories'
export { Disabled } from './Disabled.stories'
