import { useForm, Submit, Form, NumberInputField } from '@ultraviolet/form'
import { Snippet, Stack } from '@ultraviolet/ui'
import { mockErrors } from '../../mocks/mockErrors'

const getQueryParam = (param: string, defaultValue: string): string | null => {
  if (typeof window === 'undefined') return defaultValue
  const params = new URLSearchParams(window.location.search)
  return params.get(param) ?? defaultValue
}

const Render = () => {
  const methods = useForm<{ example: number }>({
    mode: 'onChange',
    defaultValues: {
      example: 5,
    },
  })

  const registerMode = getQueryParam('registerMode', 'false') != 'false'

  const { errors, isDirty, isValid, isSubmitSuccessful } = methods.formState

  return (
    <Form errors={mockErrors} methods={methods} onSubmit={console.log} _experimentalRegisterMode={registerMode}>
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
              isSubmitSuccessful,
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
