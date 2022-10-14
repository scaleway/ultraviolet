import { ComponentStory } from '@storybook/react'
import Menu from '../../Menu'
import Status, { statusVariants } from '../index'

export const Variants: ComponentStory<typeof Menu> = props => (
  <>
    {statusVariants.map(variant => (
      <Status key={variant} variant={variant} {...props} />
    ))}
  </>
)

Variants.parameters = {
  docs: {
    storyDescription: 'Set `variant` using variant property.',
  },
}

Variants.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', gap: 16 }}>
      <StoryComponent />
    </div>
  ),
]
