import { Story } from '@storybook/react'
import { textBoxSizes } from '..'
import UncontrolledTextBox from './UncontrolledTextBox'

export const Sizes: Story = props => (
  <>
    {textBoxSizes.map(size => (
      <UncontrolledTextBox
        {...props}
        key={size}
        placeholder={`Size ${size}`}
        size={size}
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
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
      }}
    >
      <StoryComponent />
    </div>
  ),
]
