import { Stack } from '@scaleway/ui'
import type { StoryFn } from '@storybook/react'
import { SelectableCardField } from '..'
import type { FormProps } from '../../Form'
import { Form } from '../../Form'

export const Checked: StoryFn<FormProps> = ({ errors }) => (
  <Form onRawSubmit={() => {}} errors={errors} initialValues={{ foo: 'bar' }}>
    <Stack gap={2}>
      <SelectableCardField name="foo" value="bar">
        Radio left
      </SelectableCardField>
      <SelectableCardField name="foo" value="barbar">
        Radio right
      </SelectableCardField>
    </Stack>
  </Form>
)
