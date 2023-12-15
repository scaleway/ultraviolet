import type { Meta } from '@storybook/react'
import { NumberInputV2 } from '..'

export default {
  component: NumberInputV2,
  decorators: [
    StoryComponent => (
      <div
        style={{
          width: '250px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
  parameters: {
    experimental: true,
  },
  title: 'Components/Data Entry/NumberInputV2',
} as Meta<typeof NumberInputV2>

export { Playground } from './Playground.stories'
