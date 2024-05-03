import type { StoryFn } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { RadioField } from '..'
import type { FormErrors } from '../../../types'
import { Form } from '../../Form'

export const Checked: StoryFn<{ errors: FormErrors }> = ({ errors }) => {
  const methods = useForm({ defaultValues: { foo: 'bar' } })

  return (
    <Form onSubmit={() => {}} errors={errors} methods={methods}>
      <RadioField name="foo" value="bar" label="Checked Radio" />
    </Form>
  )
}
