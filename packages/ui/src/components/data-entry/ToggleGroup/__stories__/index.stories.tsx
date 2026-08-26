import type { Meta } from '@storybook/react-vite'
import { ToggleGroup } from '..'

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
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
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
