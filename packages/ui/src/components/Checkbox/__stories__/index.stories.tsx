import type { Meta } from '@storybook/react-vite'
import { Checkbox } from '..'

export default {
  component: Checkbox,
  decorators: [
    StoryComponent => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <StoryComponent />
      </div>
    ),
  ],
  title: 'Components/Data Entry/Checkbox',
} as Meta<typeof Checkbox>

export { Playground } from './Playground.stories'
export { Checked } from './Checked.stories'
export { Disabled } from './Disabled.stories'
export { Errors } from './Errors.stories'
export { Value } from './Value.stories'
export { EmptyText } from './EmptyText.stories'
export { Required } from './Required.stories'
export { Helper } from './Helper.stories'
