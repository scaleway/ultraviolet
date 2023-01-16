import type { ComponentMeta } from '@storybook/react'
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
} as ComponentMeta<typeof Checkbox>

export { Playground } from './Playground.stories'
export { Checked } from './Checked.stories'
export { Disabled } from './Disabled.stories'
export { Errors } from './Errors.stories'
export { Progress } from './Progress.stories'
export { Sizes } from './Sizes.stories'
export { Value } from './Value.stories'
export { EmptyText } from './EmptyText.stories'
