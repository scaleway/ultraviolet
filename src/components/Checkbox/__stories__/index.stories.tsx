import { ComponentMeta } from '@storybook/react'
import Checkbox from '..'

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

export { Playground } from './Playground'
export { Checked } from './Checked'
export { Disabled } from './Disabled'
export { Errors } from './Errors'
export { Progress } from './Progress'
export { Sizes } from './Sizes'
export { Value } from './Value'
