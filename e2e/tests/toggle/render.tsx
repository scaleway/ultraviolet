import {
  CheckboxField,
  Form,
  Submit,
  ToggleField,
  useForm,
} from '@ultraviolet/form'
import { Checkbox, Stack, Toggle } from '@ultraviolet/ui'
import { useReducer } from 'react'

const defaultError = ({ label }: { label: string }) =>
  `${label} is default error`

const formError = {
  isInteger: defaultError,
  max: defaultError,
  maxDate: defaultError,
  maxLength: defaultError,
  min: defaultError,
  minDate: defaultError,
  minLength: defaultError,
  pattern: defaultError,
  required: defaultError,
}
const defaultReducer = (state: boolean) => !state

const Render = () => {
  const [checkbox, toggleCheckbox] = useReducer(defaultReducer, false)
  const [toggle, toggleToggle] = useReducer(defaultReducer, false)

  const methods = useForm({
    defaultValues: {
      checkboxForm: false,
      toggleFieldForm: false,
    },
    mode: 'onChange',
  })

  return (
    <Stack flex={1} gap={1}>
      <Toggle
        checked={toggle}
        label="Toggle"
        name="toggle"
        onChange={toggleToggle}
      />

      <Checkbox
        aria-label="Checkbox"
        checked={checkbox}
        name="checkbox"
        onChange={toggleCheckbox}
      />

      <Form
        errors={formError}
        methods={methods}
        name="form"
        onSubmit={() => {}}
      >
        <ToggleField label="ToggleField" name="toggleFieldForm" />
        <CheckboxField label="CheckboxField" name="checkboxForm">
          CheckboxField
        </CheckboxField>
        <Submit>Submit</Submit>
      </Form>
    </Stack>
  )
}
export default Render
