import type { StoryFn } from '@storybook/react'
import type { FormErrors } from '../../../types'
import { RadioField } from '..'
import { Form } from '../../Form'

export const Checked: StoryFn<{ errors: FormErrors }> = ({ errors }) => (
  <Form onRawSubmit={() => {}} errors={errors} initialValues={{ foo: 'bar' }}>
    <RadioField name="foo" value="bar" label="Checked Radio" />
  </Form>
)
