import { Story } from '@storybook/react'
import Badge, { SIZES } from '..'

export const Sizes: Story = props => (
  <>
    {Object.keys(SIZES).map(size => (
      <Badge
        {...props}
        key={size}
        variant="primary"
        size={size as keyof typeof SIZES}
      >
        {size}
      </Badge>
    ))}
  </>
)

Sizes.parameters = {
  docs: {
    storyDescription: 'You can define size of a badge using `size` property.',
  },
}

Sizes.args = {
  children: [],
}

Sizes.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
