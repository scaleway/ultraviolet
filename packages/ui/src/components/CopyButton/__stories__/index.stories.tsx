import type { Meta } from '@storybook/react'
import { CopyButton } from '..'
import { Stack } from '../../Stack'

export default {
  component: CopyButton,
  decorators: [
    StoryComponent => (
      <Stack gap={2} direction="row">
        <StoryComponent />
      </Stack>
    ),
  ],
  title: 'Components/Action/CopyButton',
} as Meta<typeof CopyButton>

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Sizes } from './Sizes.stories'
export { NoBorder } from './NoBorder.stories'
export { CustomTexts } from './CustomTexts.stories'
