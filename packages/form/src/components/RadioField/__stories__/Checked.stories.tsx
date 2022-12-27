import type { Story } from '@storybook/react'
import { RadioField } from '..'
import type { FormProps } from '../../Form'
import { Form } from '../../Form'

export const Checked: Story<FormProps> = ({ errors }) => (
  <Form onRawSubmit={() => {}} errors={errors} initialValues={{ foo: 'bar' }}>
    <RadioField name="foo" value="bar">
      Checked Radio
    </RadioField>
  </Form>
)
