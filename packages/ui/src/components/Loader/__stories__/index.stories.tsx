import type { Meta } from '@storybook/react-vite'
import { Loader } from '..'
import { Stack } from '../../Stack'

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
    a11yStatus: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { Percentages } from './Percentages.stories'
export { Sizes } from './Sizes.stories'
export { Sentiments } from './Sentiments.stories'
export { Active } from './Active.stories'
