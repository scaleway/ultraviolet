import type { Story } from '@storybook/react'
import { SIZES, Toggle } from '..'
import { Stack } from '../../Stack'

export const Sizes: Story = props => (
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
    storyDescription: 'You can define size of a Toggle using `size` property.',
  },
}

Sizes.decorators = [
  StoryComponent => (
    <Stack gap={1}>
      <StoryComponent />
    </Stack>
  ),
]
