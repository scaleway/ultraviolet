import type { Story } from '@storybook/react'
import UnitInput, { sizesHeight } from '..'
import Stack from '../../Stack'

export const Sizes: Story = props => (
  <>
    {Object.keys(sizesHeight).map(size => (
      <UnitInput key={size} size={size} {...props} />
    ))}
  </>
)

Sizes.parameters = {
  docs: {
    storyDescription:
      'You can change the original size with the `size` prop. It allow the following values : `small`, `medium`, `large`',
  },
}

Sizes.decorators = [
  StoryComponent => (
    <Stack gap={1}>
      <StoryComponent />
    </Stack>
  ),
]
