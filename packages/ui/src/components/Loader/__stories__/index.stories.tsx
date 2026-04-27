import { Loader } from '..'
import { Stack } from '../../Stack'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Loader,
  title: 'UI/Feedback/Loader',
  decorators: [
    StoryComponent => (
      <Stack direction="row" gap={1}>
        <StoryComponent />
      </Stack>
    ),
  ],
  parameters: {
    a11y: 'partial',
  },
} as Meta

export { Playground } from './Playground.stories'
export { Percentages } from './Percentages.stories'
export { Sizes } from './Sizes.stories'
export { Sentiments } from './Sentiments.stories'
export { Active } from './Active.stories'
