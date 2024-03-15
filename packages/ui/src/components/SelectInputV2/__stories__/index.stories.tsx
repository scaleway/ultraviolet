import type { Meta } from '@storybook/react'
import { SelectInputV2 } from '..'

export default {
  component: SelectInputV2,
  decorators: [
    StoryComponent => (
      <div style={{ marginBottom: 150 }}>
        <StoryComponent />
      </div>
    ),
  ],

  title: 'Components/Data Entry/SelectInputV2',
} as Meta<typeof SelectInputV2>

export { Playground } from './Playground.stories'
export { Grouped } from './Grouped.stories'
