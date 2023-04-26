import type { Meta } from '@storybook/react'
import { Loader } from '..'
import { Stack } from '../../Stack'

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

export { Playground } from './Playground'
export { Percentages } from './Percentages'
export { Sizes } from './Sizes'
export { Colors } from './Colors'
export { TrailColor } from './TrailColor'
export { StrokeWidth } from './StrokeWidth'
export { Text } from './Text'
export { Active } from './Active'
