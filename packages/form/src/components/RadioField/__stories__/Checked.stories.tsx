import type { StoryFn } from '@storybook/react-vite'
import { useForm } from '../../..'
import type { FormErrors } from '../../../types'
import { Form } from '../../Form'
import { RadioField } from '..'

export const Checked: StoryFn<{ errors: FormErrors }> = ({ errors }) => {
  const methods = useForm({ defaultValues: { foo: 'bar' } })

  return (
    <Form onSubmit={() => {}} errors={errors} methods={methods}>
      <RadioField name="foo" value="bar" label="Checked Radio" />
    </Form>
  )
}
