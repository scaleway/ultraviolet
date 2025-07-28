import type { StoryFn } from '@storybook/react-vite'
import { useForm } from '../../..'
import type { FormErrors } from '../../../types'
import { Form } from '../../Form'
import { CheckboxField } from '..'

export const Checked: StoryFn<{ errors: FormErrors }> = ({ errors }) => {
  const methods = useForm({ defaultValues: { foo: true } })

  return (
    <Form onSubmit={() => {}} errors={errors} methods={methods}>
      <CheckboxField name="foo">Checked Item</CheckboxField>
      <CheckboxField name="bar">Not Checked Item</CheckboxField>
    </Form>
  )
}
