import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'
import { Submit } from '..'

export const Playground: StoryFn<ComponentProps<typeof Submit>> = ({
  children,
  ...props
}) => {
  const methods = useForm()

  return (
    <Form errors={mockErrors} methods={methods} onSubmit={() => {}}>
      <Submit {...props}>This form is ready to submit</Submit>
    </Form>
  )
}
