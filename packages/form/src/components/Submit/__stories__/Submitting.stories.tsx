import type { StoryFn } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { Submit } from '..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

export const Submitting: StoryFn = () => {
  const methods = useForm()

  const { isSubmitting } = methods.formState

  return (
    <Form
      errors={mockErrors}
      onSubmit={() =>
        new Promise(resolve => {
          setTimeout(() => resolve(undefined), 5000)
        })
      }
      methods={methods}
    >
      <Submit>
        {isSubmitting ? 'This form is submitting' : 'Click to submit for 5sec'}
      </Submit>
    </Form>
  )
}
