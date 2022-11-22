import { Story } from '@storybook/react'
import { progressBarVariants } from '..'
import UncontrolledProgressBar from './UncontrolledProgressBar'

export const Variants: Story = props => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }} {...props}>
    {progressBarVariants.map(variant => (
      <UncontrolledProgressBar key={variant} variant={variant} />
    ))}
  </div>
)

Variants.parameters = {
  docs: {
    storyDescription: 'Set variant using `variant` prop.',
  },
}
