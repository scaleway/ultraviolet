import type { StoryFn } from '@storybook/react-vite'
import { useForm } from '../../..'
import type { FormErrors } from '../../../types'
import { Form } from '../../Form'
import { CheckboxField } from '..'

export const BooleanChecked: StoryFn<{ errors: FormErrors }> = ({ errors }) => {
  const methods = useForm({ defaultValues: { foo: true } })

  return (
    <Form errors={errors} methods={methods} onSubmit={() => {}}>
      <CheckboxField name="foo">Default Checked Boolean Item</CheckboxField>
    </Form>
  )
}
