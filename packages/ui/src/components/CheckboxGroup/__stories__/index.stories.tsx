import { CheckboxGroup } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: CheckboxGroup,
  decorators: [
    StoryComponent => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <StoryComponent />
      </div>
    ),
  ],
  title: 'UI/Data Entry/CheckboxGroup',
  args: {
    name: 'conditions',
    legend: 'Conditions:',
    value: ['value-1'],
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
} as Meta<typeof CheckboxGroup>

export { Playground } from './Playground.stories'
export { Controlled } from './Controlled.stories'
export { Direction } from './Direction.stories'
export { Required } from './Required.stories'
export { Description } from './Description.stories'
export { Helper } from './Helper.stories'
export { Error } from './Error.stories'
