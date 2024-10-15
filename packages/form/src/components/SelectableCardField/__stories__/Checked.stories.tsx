import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import { SelectableCardField } from '..'
import { useForm } from '../../..'
import type { FormErrors } from '../../../types'
import { Form } from '../../Form'

export const Checked: StoryFn<{ errors: FormErrors }> = ({ errors }) => {
  const methods = useForm({ defaultValues: { foo: 'bar' } })

  return (
    <Form onSubmit={() => {}} errors={errors} methods={methods}>
      <Stack gap={2}>
        <SelectableCardField name="foo" value="bar" label="Radio Left">
          Radio left
        </SelectableCardField>
        <SelectableCardField name="foo" value="barbar" label="Radio Right">
          Radio right
        </SelectableCardField>
      </Stack>
    </Form>
  )
}
