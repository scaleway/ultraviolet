import type { StoryFn } from '@storybook/react-vite'
import { Submit } from '..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'
import { TextInputField } from '../../TextInputField'

export const Invalid: StoryFn = () => {
  const methods = useForm()

  return (
    <Form errors={mockErrors} methods={methods} onSubmit={() => {}}>
      <TextInputField disabled name="invalid" required />
      <Submit>This form is invalid</Submit>
    </Form>
  )
}
