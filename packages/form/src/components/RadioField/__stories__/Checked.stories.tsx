import type { StoryFn } from '@storybook/react-vite'
import { RadioField } from '..'
import { useForm } from '../../..'
import type { FormErrors } from '../../../types'
import { Form } from '../../Form'

export const Checked: StoryFn<{ errors: FormErrors }> = ({ errors }) => {
  const methods = useForm({ defaultValues: { foo: 'bar' } })

  return (
    <Form errors={errors} methods={methods} onSubmit={() => {}}>
      <RadioField label="Checked Radio" name="foo" value="bar" />
    </Form>
  )
}
