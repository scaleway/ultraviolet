import type { Meta } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Loader } from '..'

export default {
  component: Loader,
  title: 'Components/Feedback/Loader',
  decorators: [
    StoryComponent => (
      <Stack direction="row" gap={1}>
        <StoryComponent />
      </Stack>
    ),
  ],
} as Meta

export { Active } from './Active.stories'
export { Percentages } from './Percentages.stories'
export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Sizes } from './Sizes.stories'
