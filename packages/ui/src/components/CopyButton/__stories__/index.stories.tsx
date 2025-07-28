import type { Meta } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { CopyButton } from '..'

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

export { Bordered } from './Bordered.stories'
export { Children } from './Children.stories'
export { CustomTexts } from './CustomTexts.stories'
export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Sizes } from './Sizes.stories'
