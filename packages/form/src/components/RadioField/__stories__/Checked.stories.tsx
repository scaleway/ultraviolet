import { RadioField } from '..'
import { useForm } from '../../..'
import { Form } from '../../Form'

import type { FormErrors } from '../../../types'
import type { StoryFn } from '@storybook/react-vite'

export const Checked: StoryFn<{ errors: FormErrors }> = ({ errors }) => {
  const methods = useForm({ defaultValues: { foo: 'bar' } })

  return (
    <Form errors={errors} methods={methods} onSubmit={() => {}}>
      <RadioField label="Checked Radio" name="foo" value="bar" />
    </Form>
  )
}
