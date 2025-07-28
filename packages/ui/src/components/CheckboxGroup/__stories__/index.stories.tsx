import type { Meta } from '@storybook/react-vite'
import { CheckboxGroup } from '..'

export default {
  component: CheckboxGroup,
  decorators: [
    StoryComponent => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <StoryComponent />
      </div>
    ),
  ],
  title: 'Components/Data Entry/CheckboxGroup',
  args: {
    name: 'conditions',
    legend: 'Conditions:',
    value: ['value-1'],
  },
} as Meta<typeof CheckboxGroup>

export { Controlled } from './Controlled.stories'
export { Description } from './Description.stories'
export { Direction } from './Direction.stories'
export { Error } from './Error.stories'
export { Helper } from './Helper.stories'
export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
