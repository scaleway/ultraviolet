import { Story } from '@storybook/react'
import Badge, { SIZES } from '..'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Sizes: Story = _props => (
  <>
    {Object.keys(SIZES).map(size => (
      <Badge key={size} variant="primary" size={size as keyof typeof SIZES}>
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
