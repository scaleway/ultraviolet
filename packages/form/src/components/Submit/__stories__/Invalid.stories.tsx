import { Submit } from '..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'
import { TextInputField } from '../../TextInputField'

import type { StoryFn } from '@storybook/react-vite'

export const Invalid: StoryFn = () => {
  const methods = useForm()

  return (
    <Form errors={mockErrors} methods={methods} onSubmit={() => {}}>
      <TextInputField disabled name="invalid" required />
      <Submit>This form is invalid</Submit>
    </Form>
  )
}
