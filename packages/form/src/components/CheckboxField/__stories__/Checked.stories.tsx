import type { StoryFn } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { CheckboxField } from '..'
import type { FormErrors } from '../../../types'
import { Form } from '../../Form'

export const Checked: StoryFn<{ errors: FormErrors }> = ({ errors }) => {
  const methods = useForm({ defaultValues: { foo: true } })

  return (
    <Form onSubmit={() => {}} errors={errors} methods={methods}>
      <CheckboxField name="foo">Checked Item</CheckboxField>
      <CheckboxField name="bar">Not Checked Item</CheckboxField>
    </Form>
  )
}
