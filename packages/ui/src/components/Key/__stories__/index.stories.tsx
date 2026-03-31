import { Key } from '..'
import { Stack } from '../../Stack'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Key,
  decorators: [
    StoryComponent => (
      <Stack direction="row" gap={2}>
        <StoryComponent />
      </Stack>
    ),
  ],
  title: 'UI/Other/Key',
} as Meta<typeof Key>

export { Playground } from './Playground.stories'
export { Sentiment } from './Sentiment.stories'
export { Prominence } from './Prominence.stories'
export { Disabled } from './Disabled.stories'
export { Size } from './Size.stories'
export { SpecialKeys } from './SpeciaKeys.stories'
export { Usage } from './Usage.stories'
