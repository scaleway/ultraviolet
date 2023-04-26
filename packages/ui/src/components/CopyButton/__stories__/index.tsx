import type { ComponentMeta } from '@storybook/react'
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
  parameters: {
    docs: {
      description: {
        component: 'A simple button to copy a value to the clipboard.',
      },
    },
  },
  title: 'Components/Action/CopyButton',
} as ComponentMeta<typeof CopyButton>

export { Playground } from './Playground'
export { Variants } from './Variants'
export { Sizes } from './Sizes'
export { NoBorder } from './NoBorder'
export { CustomTexts } from './CustomTexts'
