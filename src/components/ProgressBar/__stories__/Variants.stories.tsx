import { Story } from '@storybook/react'
import { progressBarVariants } from '..'
import UncontrolledProgressBar from './UncontrolledProgressBar'

export const Variants: Story = props => (
  <>
    {progressBarVariants.map(variant => (
      <UncontrolledProgressBar key={variant} variant={variant} {...props} />
    ))}
  </>
)

Variants.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]

Variants.parameters = {
  docs: {
    storyDescription: 'Set variant using `variant` prop.',
  },
}
