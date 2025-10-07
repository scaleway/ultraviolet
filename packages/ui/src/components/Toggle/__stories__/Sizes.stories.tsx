import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Toggle } from '..'

export const Sizes: StoryFn = props => (
  <>
    {(['small', 'large'] as const).map(size => (
      <Toggle key={size} label={size} name="label" size={size} {...props} />
    ))}
  </>
)

Sizes.parameters = {
  docs: {
    description: {
      story: 'You can define size of a Toggle using `size` property.',
    },
  },
}

Sizes.decorators = [
  StoryComponent => (
    <Stack gap={1}>
      <StoryComponent />
    </Stack>
  ),
]
