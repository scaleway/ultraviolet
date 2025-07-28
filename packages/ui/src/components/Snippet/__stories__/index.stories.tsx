import type { Meta } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Snippet } from '..'

export default {
  component: Snippet,
  decorators: [
    StoryComponent => (
      <Stack gap={2} direction="row">
        <StoryComponent />
      </Stack>
    ),
  ],
  title: 'Components/Data Display/Snippet',
} as Meta<typeof Snippet>

export { LongMultiline } from './LongMultiline.stories'
export { LongMultilineExpanded } from './LongMultilineExpanded.stories'
export { LongSingleLine } from './LongSingleLine.stories'
export { Multiline } from './Multiline.stories'
export { NoExpandable } from './NoExpandable.stories'
export { Playground } from './Playground.stories'
export { Prefixes } from './Prefixes.stories'
export { Rows } from './Rows.stories'
export { SingleLine } from './SingleLine.stories'
