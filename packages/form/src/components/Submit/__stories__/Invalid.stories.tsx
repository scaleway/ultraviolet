import type { StoryFn } from '@storybook/react-vite'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'
import { TextInputField } from '../../TextInputField'
import { Submit } from '..'

export const Invalid: StoryFn = () => {
  const methods = useForm()

  return (
    <Form onSubmit={() => {}} errors={mockErrors} methods={methods}>
      <TextInputField required disabled name="invalid" />
      <Submit>This form is invalid</Submit>
    </Form>
  )
}
