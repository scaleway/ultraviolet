import type { Meta } from '@storybook/react'
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
} as Meta<typeof CheckboxGroup>

export { Playground } from './Playground.stories'
export { Value } from './Value.stories'
