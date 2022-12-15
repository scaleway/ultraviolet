import type { ComponentMeta } from '@storybook/react'
import CopyButton from '..'
import Stack from '../../Stack'

export default {
  component: CopyButton,
  decorators: [
    StoryComponent => (
      <Stack gap={2} direction="row">
        <StoryComponent />
      </Stack>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A simple button to copy a value to the clipboard.',
      },
    },
  },
  title: 'Components/Button/CopyButton',
} as ComponentMeta<typeof CopyButton>

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
export { Sizes } from './Sizes.stories'
export { NoBorder } from './NoBorder.stories'
export { CustomTexts } from './CustomTexts.stories'
