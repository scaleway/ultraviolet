import type { Story } from '@storybook/react'
import Bullet, { bulletVariants } from '..'

export const Variants: Story = props => (
  <>
    {bulletVariants.map(variant => (
      <Bullet {...props} key={variant} variant={variant} text="1" />
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
