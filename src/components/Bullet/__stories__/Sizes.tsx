import { Story } from '@storybook/react'
import Bullet, { bulletSizes } from '..'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Sizes: Story = _props => (
  <>
    {bulletSizes.map(size => (
      <div key={size}>
        <Bullet size={size} text="1" />
      </div>
    ))}
  </>
)

Sizes.parameters = {
  docs: {
    storyDescription: 'You can define size of a badge using `size` property.',
  },
}

Sizes.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
