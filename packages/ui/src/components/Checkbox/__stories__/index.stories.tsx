import { Checkbox } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Checkbox,
  decorators: [
    StoryComponent => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <StoryComponent />
      </div>
    ),
  ],
  title: 'UI/Data Entry/Checkbox',
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
} as Meta<typeof Checkbox>

export { Playground } from './Playground.stories'
export { Checked } from './Checked.stories'
export { Disabled } from './Disabled.stories'
export { Errors } from './Errors.stories'
export { Value } from './Value.stories'
export { EmptyText } from './EmptyText.stories'
export { Required } from './Required.stories'
export { Helper } from './Helper.stories'
export { Sizes } from './Sizes.stories'
