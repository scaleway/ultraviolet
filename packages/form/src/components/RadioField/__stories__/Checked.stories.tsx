import type { StoryFn } from '@storybook/react'
import { RadioField } from '..'
import type { FormProps } from '../../Form'
import { Form } from '../../Form'

export const Checked: StoryFn<FormProps> = ({ errors }) => (
  <Form onRawSubmit={() => {}} errors={errors} initialValues={{ foo: 'bar' }}>
    <RadioField name="foo" value="bar" label="Checked Radio" />
  </Form>
)
