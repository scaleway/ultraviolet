import type { StoryFn } from '@storybook/react-vite'
import { useForm } from '../../..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'
import { Submit } from '..'

export const Submitting: StoryFn = () => {
  const methods = useForm()

  const { isSubmitting } = methods.formState

  return (
    <Form
      errors={mockErrors}
      methods={methods}
      onSubmit={async () =>
        new Promise(resolve => {
          setTimeout(() => resolve(undefined), 5000)
        })
      }
    >
      <Submit>
        {isSubmitting ? 'This form is submitting' : 'Click to submit for 5sec'}
      </Submit>
    </Form>
  )
}
