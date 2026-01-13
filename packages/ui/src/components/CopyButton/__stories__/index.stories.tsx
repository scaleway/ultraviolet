import type { Meta } from '@storybook/react-vite'
import { CopyButton } from '..'
import { Stack } from '../../Stack'

export default {
  component: CopyButton,
  decorators: [
    StoryComponent => (
      <Stack direction="row" gap={2}>
        <StoryComponent />
      </Stack>
    ),
  ],
  title: 'Components/Action/CopyButton',
} as Meta<typeof CopyButton>

export { Playground } from './Playground.stories'
export { Children } from './Children.stories'
export { Sentiments } from './Sentiments.stories'
export { Sizes } from './Sizes.stories'
export { Bordered } from './Bordered.stories'
export { CustomTexts } from './CustomTexts.stories'
