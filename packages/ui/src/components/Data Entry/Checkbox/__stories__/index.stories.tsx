import type { Meta } from '@storybook/react-vite'
import { Checkbox } from '..'
import { Stack } from '../../../Layout/Stack'

export default {
  component: Checkbox,
  decorators: [
    StoryComponent => (
      <Stack alignItems="start" gap={2}>
        <StoryComponent />
      </Stack>
    ),
  ],
  title: 'UI/Data Entry/Checkbox',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: true,
      robust: false,
    },
  },
} as Meta<typeof Checkbox>

export { Playground } from './Playground.stories'
export { Checked } from './Checked.stories'
export { Disabled } from './Disabled.stories'
export { Errors } from './Errors.stories'
export { Value } from './Value.stories'
export { EmptyText } from './EmptyText.stories'
export { Required } from './Required.stories'
export { Helper } from './Helper.stories'
export { Sizes } from './Sizes.stories'
