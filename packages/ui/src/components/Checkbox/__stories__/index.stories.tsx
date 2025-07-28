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

export { Checked } from './Checked.stories'
export { Disabled } from './Disabled.stories'
export { EmptyText } from './EmptyText.stories'
export { Errors } from './Errors.stories'
export { Helper } from './Helper.stories'
export { Playground } from './Playground.stories'
export { Required } from './Required.stories'
export { Value } from './Value.stories'
