import { Meta } from '@storybook/react'
import Loader from '..'
import Stack from '../../Stack'

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

export { Playground } from './Playground.stories'
export { Percentages } from './Percentages.stories'
export { Sizes } from './Sizes.stories'
export { Colors } from './Colors.stories'
export { TrailColor } from './TrailColor.stories'
export { StrokeWidth } from './StrokeWidth.stories'
export { Text } from './Text.stories'
export { Active } from './Active.stories'
