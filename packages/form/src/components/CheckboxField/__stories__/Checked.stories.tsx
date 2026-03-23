import { CheckboxField } from '..'
import { useForm } from '../../..'
import { Form } from '../../Form'

import type { FormErrors } from '../../../types'
import type { StoryFn } from '@storybook/react-vite'

export const Checked: StoryFn<{ errors: FormErrors }> = ({ errors }) => {
  const methods = useForm({ defaultValues: { foo: true } })

  return (
    <Form errors={errors} methods={methods} onSubmit={() => {}}>
      <CheckboxField name="foo">Checked Item</CheckboxField>
      <CheckboxField name="bar">Not Checked Item</CheckboxField>
    </Form>
  )
}
