import { Story } from '@storybook/react'
import Bullet, { bulletVariants } from '..'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Variants: Story = _props => (
  <>
    {bulletVariants.map(variant => (
      <Bullet key={variant} variant={variant} text="1" />
    ))}
  </>
)

Variants.parameters = {
  docs: {
    storyDescription:
      'Variant defines different colors of your component. You can define it using `variant` property.',
  },
}

Variants.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
