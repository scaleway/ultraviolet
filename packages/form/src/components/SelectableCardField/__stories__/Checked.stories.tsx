import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import { useForm } from '../../..'
import type { FormErrors } from '../../../types'
import { Form } from '../../Form'
import { SelectableCardField } from '..'

export const Checked: StoryFn<{ errors: FormErrors }> = ({ errors }) => {
  const methods = useForm({ defaultValues: { foo: 'bar' } })

  return (
    <Form errors={errors} methods={methods} onSubmit={() => {}}>
      <Stack gap={2}>
        <SelectableCardField label="Radio Left" name="foo" value="bar">
          Radio left
        </SelectableCardField>
        <SelectableCardField label="Radio Right" name="foo" value="barbar">
          Radio right
        </SelectableCardField>
      </Stack>
    </Form>
  )
}
