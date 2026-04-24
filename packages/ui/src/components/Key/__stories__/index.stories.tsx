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
  parameters: {
    a11y: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
} as Meta<typeof Key>

export { Playground } from './Playground.stories'
export { Sentiment } from './Sentiment.stories'
export { Prominence } from './Prominence.stories'
export { Disabled } from './Disabled.stories'
export { Size } from './Size.stories'
export { SpecialKeys } from './SpeciaKeys.stories'
export { Usage } from './Usage.stories'
