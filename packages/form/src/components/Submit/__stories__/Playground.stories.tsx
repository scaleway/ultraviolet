import { Submit } from '..'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

import type { StoryFn } from '@storybook/react-vite'

export const Playground: StoryFn = ({ children, ...props }) => {
  const methods = useForm()

  return (
    <Form errors={mockErrors} methods={methods} onSubmit={() => {}}>
      <Submit {...props}>This form is ready to submit</Submit>
    </Form>
  )
}
