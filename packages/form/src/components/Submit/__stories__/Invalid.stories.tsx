import type { StoryFn } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { Submit } from '..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'
import { TextInputField } from '../../TextInputField'

export const Invalid: StoryFn = () => {
  const methods = useForm()

  return (
    <Form onSubmit={() => {}} errors={mockErrors} methods={methods}>
      <TextInputField required disabled name="invalid" />
      <Submit>This form is invalid</Submit>
    </Form>
  )
}
