import type { ComponentMeta } from '@storybook/react'
import ProgressionButton from '..'

export default {
  component: ProgressionButton,
  decorators: [
    StoryComponent => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <StoryComponent />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A progression button is an horizontal progress bar.',
      },
    },
  },
  title: 'Components/Button/ProgressionButton',
} as ComponentMeta<typeof ProgressionButton>

export { Playground } from './Playground.stories'
export { Example } from './Example.stories'
