import type { StoryFn } from '@storybook/react-vite'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'
import { TextInputField } from '../../TextInputField'
import { Submit } from '..'

export const Invalid: StoryFn = () => {
  const methods = useForm()

  return (
    <Form errors={mockErrors} methods={methods} onSubmit={() => {}}>
      <TextInputField disabled name="invalid" required />
      <Submit>This form is invalid</Submit>
    </Form>
  )
}
