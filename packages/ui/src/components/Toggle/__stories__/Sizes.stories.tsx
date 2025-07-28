import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { SIZES, Toggle } from '..'

export const Sizes: StoryFn = props => (
  <>
    {Object.keys(SIZES).map(size => (
      <Toggle
        key={size}
        label={size}
        name="label"
        size={size as keyof typeof SIZES}
        {...props}
      />
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
