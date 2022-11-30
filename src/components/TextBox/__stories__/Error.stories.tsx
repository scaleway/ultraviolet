import { Story } from '@storybook/react'
import ErrorTransition from '../../../__stories__/components/ErrorTransition'
import UncontrolledTextBox from './UncontrolledTextBox'

export const Error: Story = () => (
  <ErrorTransition error="An error">
    {error => <UncontrolledTextBox error={error} placeholder="Placeholder" />}
  </ErrorTransition>
)

Error.parameters = {
  docs: {
    storyDescription: 'Fill `TextBox` error using `error` property.',
  },
}
