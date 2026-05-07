import { ToggleGroup } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: ToggleGroup,
  decorators: [
    StoryComponent => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <StoryComponent />
      </div>
    ),
  ],
  title: 'UI/Data Entry/ToggleGroup',
  args: {
    name: 'options',
    legend: 'Choose options:',
    value: ['weekly-save'],
  },
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
} as Meta<typeof ToggleGroup>

export { Playground } from './Playground.stories'
export { Controlled } from './Controlled.stories'
export { Direction } from './Direction.stories'
export { Description } from './Description.stories'
export { Helper } from './Helper.stories'
export { Error } from './Errors.stories'
export { Required } from './Required.stories'
