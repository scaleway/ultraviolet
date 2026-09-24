import type { StoryFn } from '@storybook/react-vite'
import { Submit } from '..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

export const Playground: StoryFn = ({ children: _children, ...props }) => {
  const methods = useForm()

  return (
    <Form errors={mockErrors} methods={methods} onSubmit={() => undefined}>
      <Submit {...props}>This form is ready to submit</Submit>
    </Form>
  )
}
