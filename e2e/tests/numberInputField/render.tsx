import { useForm, Submit, Form, NumberInputField } from '@ultraviolet/form'
import { Snippet, Stack } from '@ultraviolet/ui'
import { mockErrors } from '../../mocks/mockErrors'

const Render = () => {
  const methods = useForm<{ example: number }>({
    mode: 'onChange',
    defaultValues: {
      example: 5,
    },
  })

  const { errors, isDirty, isValid } = methods.formState

  return (
    <Form errors={mockErrors} methods={methods} onSubmit={console.log}>
      <Stack gap={2}>
        <Stack gap={2} width="250px">
          <NumberInputField min={0} max={10} name="example" label="Test" />
          <Submit>Submit</Submit>
        </Stack>

        <Snippet prefix="lines" initiallyExpanded>
          {JSON.stringify(
            {
              values: methods.watch(),
              errors,
              isDirty,
              isValid,
            },
            (_key, value) => {
              if (value instanceof HTMLElement) {
                return { name: value.getAttribute('name') }
              }
              if (Number.isNaN(value)) {
                return 'NaN'
              }
              return value
            },
            1,
          )}
        </Snippet>
      </Stack>
    </Form>
  )
}

export default Render
