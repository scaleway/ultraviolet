import { CopyButton } from '..'
import { Stack } from '../../Stack'

import type { Meta } from '@storybook/react-vite'

export default {
  component: CopyButton,
  decorators: [
    StoryComponent => (
      <Stack direction="row" gap={2}>
        <StoryComponent />
      </Stack>
    ),
  ],
  title: 'UI/Action/CopyButton',
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
} as Meta<typeof CopyButton>

export { Playground } from './Playground.stories'
export { Children } from './Children.stories'
export { Sentiments } from './Sentiments.stories'
export { Sizes } from './Sizes.stories'
export { Bordered } from './Bordered.stories'
export { CustomTexts } from './CustomTexts.stories'
