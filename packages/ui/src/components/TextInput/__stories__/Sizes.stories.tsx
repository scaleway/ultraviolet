import type { StoryFn } from '@storybook/react'
import { TextInput, textInputSizes } from '..'
import { Stack } from '../../Stack'

export const Sizes: StoryFn = props => (
  <>
    {textInputSizes.map(size => (
      <TextInput
        key={size}
        placeholder={`Size ${size}`}
        size={size}
        {...props}
      />
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
