import type { Story } from '@storybook/react'
import TextBox, { textBoxSizes } from '..'
import Stack from '../../Stack'

export const Sizes: Story = props => (
  <>
    {textBoxSizes.map(size => (
      <TextBox key={size} placeholder={`Size ${size}`} size={size} {...props} />
    ))}
  </>
)

Sizes.parameters = {
  docs: {
    storyDescription: 'Set size using `size` property.',
  },
}

Sizes.decorators = [
  StoryComponent => (
    <Stack gap={1} direction="row">
      <StoryComponent />
    </Stack>
  ),
]
